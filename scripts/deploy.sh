#!/bin/bash

# Zenith X Deployment Automation Script
# This script builds the Docker image and applies Kubernetes manifests.

set -e # Exit on error

# --- Configuration ---
# 1. Update your Docker username or registry URI
REGISTRY_NAME="your-docker-username"
IMAGE_NAME="zenith-x"
TAG="latest"
FULL_IMAGE_NAME="${REGISTRY_NAME}/${IMAGE_NAME}:${TAG}"

# 2. Check for required tools
if ! command -v docker &> /dev/null; then
    echo "Error: docker is not installed. Please install it first."
    exit 1
fi

if ! command -v kubectl &> /dev/null; then
    echo "Error: kubectl is not installed. Please install it first."
    exit 1
fi

# 3. Build the Docker image
echo "Building Docker image: ${FULL_IMAGE_NAME}..."
docker build -t "${FULL_IMAGE_NAME}" .

# 4. Push the image (Optional - uncomment if using a remote registry)
# echo "Pushing image to registry..."
# docker push "${FULL_IMAGE_NAME}"

# 5. Handle Kubernetes Secrets
# Check if MONGODB_URI is provided in a .env file or environment variable
if [ -z "$MONGODB_URI" ]; then
    if [ -f .env.local ]; then
        MONGODB_URI=$(grep MONGODB_URI .env.local | cut -d '=' -f2)
    elif [ -f .env ]; then
        MONGODB_URI=$(grep MONGODB_URI .env | cut -d '=' -f2)
    fi
fi

if [ -z "$MONGODB_URI" ]; then
    echo "Warning: MONGODB_URI not found. Kubernetes secret might be incorrect."
    echo "Please ensure MONGODB_URI is set in your environment or .env file."
else
    B64_URI=$(echo -n "$MONGODB_URI" | base64 | tr -d '\n')
    echo "Updating kubernetes/secret.yaml with your MONGODB_URI..."
    sed -i "s/REPLACE_WITH_BASE64_MONGODB_URI/$B64_URI/" kubernetes/secret.yaml
fi

# 6. Update deployment image
echo "Updating kubernetes/deployment.yaml with image: ${FULL_IMAGE_NAME}..."
sed -i "s|REPLACE_WITH_YOUR_DOCKER_IMAGE|${FULL_IMAGE_NAME}|" kubernetes/deployment.yaml

# 7. Apply Kubernetes manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f kubernetes/

echo "Deployment initiated successfully!"
echo "Check pods status with: kubectl get pods"
echo "Check service external IP with: kubectl get svc zenith-x-service"
