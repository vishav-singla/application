# DocX to PDF Converter 🚀

## Project Overview

This web application allows users to convert Microsoft Word documents (.docx) to PDF format with optional password protection. Built using a microservice architecture, the application provides a seamless document conversion experience.

## 🌟 Features

- Upload .docx files
- Convert documents to PDF
- Optional PDF password protection
- View file metadata
- Download converted PDF
- Dockerized deployment
- Kubernetes-ready microservice architecture
- Continuous Integration/Continuous Deployment (CI/CD) pipeline

## 🛠 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Conversion**: docx2pdf-converter, muhammara
- **Deployment**: Docker, Kubernetes
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js
- Docker
- Kubernetes (optional)
- npm or yarn

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vishav-singla/application.git
cd docx2pdf-converter
```

### 2. Install Dependencies

#### Backend
```bash
cd node-server
npm install
```

#### Frontend
```bash
cd react-client
npm install
```

### 3. Environment Configuration

Create `.env` files in respective directories with necessary configurations.

### 4. Run Locally

#### Backend
```bash
npm run start
```

#### Frontend
```bash
npm run run dev
```

## 🐳 Docker Deployment

### Build Images
```bash
docker build -t docx2pdf-backend ./node-server
docker build -t docx2pdf-frontend ./react-client
```

### Run Containers
```bash
docker compose up
```

## ☸️ Kubernetes Deployment

### Prerequisites
- Configured kubectl
- Kubernetes cluster

### Deploy
```bash
kubectl apply -f k8s/
```

## 🚀 CI/CD Pipeline

The project uses GitHub Actions for:
- Building Docker images
- Pushing to Docker Hub
- Deploying to Kubernetes cluster

## Security Features

- Optional PDF password protection
- Secure file handling
- Temporary file management

## Performance Considerations

- Efficient file conversion
- Scalable microservice architecture
- Dockerized and Kubernetes-ready

## 📋 API Endpoints

### Upload Endpoint
- **URL**: `/upload`
- **Method**: POST
- **Parameters**: 
  - `file`: .docx file
  - `password` (optional)

### Metadata Endpoint
- **URL**: `/metadata`
- **Method**: GET
- **Parameters**: 
  - `filename`

### Download Endpoint
- **URL**: `/download`
- **Method**: GET
- **Parameters**: 
  - `filename`

## Error Handling

- Comprehensive error logging
- User-friendly error messages
- Graceful error recovery

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

