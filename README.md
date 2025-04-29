[![Deploy to AWS](https://github.com/aguilanegra/matnerd-demo/actions/workflows/aws.yml/badge.svg?branch=main)](https://github.com/aguilanegra/invoiceapp/actions/workflows/aws.yml)
# MatNerd Demo

A Vite/React demo application with TypeScript and Tailwind CSS that showcases automatic deployment to AWS via GitHub Actions.

## Development

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
npm install
```

### Running locally
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for production
```bash
npm run build
```

## Deployment

This project is configured for automatic deployment to AWS using GitHub Actions. When a pull request is merged into the main branch, the following happens:

1. A Docker image is built
2. The image is pushed to Amazon ECR
3. The ECS service is updated to use the new image

### Required GitHub Secrets

For the GitHub Actions workflow to function correctly, you need to set the following secrets in your repository:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `AWS_REGION`: The AWS region to deploy to (e.g., `us-east-1`)
- `ECR_REPOSITORY`: The name of your ECR repository
- `ECS_CLUSTER`: The name of your ECS cluster
- `ECS_SERVICE`: The name of your ECS service

### Manual Deployment

You can also build and deploy the Docker image manually:

```bash
docker build -t matnerd-demo .
docker run -p 8080:80 matnerd-demo
```

## Project Structure

- `/src` - React application source code
- `/public` - Static assets
- `.github/workflows` - GitHub Actions workflow configuration
- `Dockerfile` - Docker configuration for building the application
- `nginx.conf` - Nginx configuration for serving the application

## Features

- React 19 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Docker containerization
- CI/CD with GitHub Actions
- AWS deployment configuration
