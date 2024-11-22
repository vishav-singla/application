const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { convert, resolvePaths } = require('docx2pdf-converter');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors({ origin: 'http://localhost:5173' }));

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const inputPath = req.file.path; // Temporary file path
        const outputPath = path.join('converted', `${req.file.originalname}.pdf`);

        // Ensure the converted directory exists
        if (!fs.existsSync('converted')) {
            fs.mkdirSync('converted');
        }

        // Convert DOCX to PDF
        await convert(inputPath, outputPath);

        // Clean up the uploaded file
        fs.unlinkSync(inputPath);

        res.json({ message: 'File converted successfully', filename: path.basename(outputPath) });
    } catch (error) {
        console.error('Error during conversion:', error);
        res.status(500).json({ error: 'Failed to convert file' });
    }
});


app.get('/metadata', (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join('converted', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    const stats = fs.statSync(filePath);
    res.json({
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
    });
});


app.get('/download', (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join('converted', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
