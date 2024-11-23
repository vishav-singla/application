import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { convert } from 'docx2pdf-converter';
import muhammara from 'muhammara';
import cors from 'cors';

const app = express();
const PORT = 8080;


const upload = multer({ dest: 'uploads/' });
const allowedOrigins = ['http://localhost:5173', 'http://application-sable-sigma.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const inputPath = req.file.path;
        const outputPath = path.join('converted', `${req.file.originalname}.pdf`);
        const password = req.body.password;

        if (!fs.existsSync('converted')) {
            fs.mkdirSync('converted');
        }

        // Convert DOCX to PDF
        await convert(inputPath, outputPath);

        if (password && password.trim() !== '') {
            const source = fs.readFileSync(outputPath);
            
            const PDFRStreamForBuffer = muhammara.PDFRStreamForBuffer;
            const PDFWStreamForBuffer = muhammara.PDFWStreamForBuffer;

            const input = new PDFRStreamForBuffer(source);
            const output = new PDFWStreamForBuffer();

            muhammara.recrypt(input, output, {
                password: password,
                userPassword: password,
                ownerPassword: password,
                userProtectionFlag: 4
            });

            const encryptedOutputPath = path.join(
                'converted',
                `${req.file.originalname}-protected.pdf`
            );

            fs.writeFileSync(encryptedOutputPath, output.buffer);
            fs.unlinkSync(outputPath);

            res.json({
                message: 'File converted and protected successfully',
                filename: path.basename(encryptedOutputPath),
            });
        } else {
            res.json({
                message: 'File converted successfully',
                filename: path.basename(outputPath),
            });
        }

        // Clean up the uploaded file
        fs.unlinkSync(inputPath);
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
