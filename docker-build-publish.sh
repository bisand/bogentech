#!/bin/bash

# Set the default version number
DEFAULT_VERSION="1.0.0.0"

# Check if the VERSION file exists
if [ ! -f VERSION ]; then
  # Create the VERSION file with the default version
  echo "$DEFAULT_VERSION" > VERSION
fi

# Read the version file
VERSION=$(cat VERSION)

# Split the version into its components
IFS='.' read -ra VERSION_PARTS <<< "$VERSION"

# Increment the build number
BUILD_NUMBER=$((VERSION_PARTS[3]+1))

# Update the version with the new build number
NEW_VERSION="${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.${VERSION_PARTS[2]}.$BUILD_NUMBER"

# Set the environment variable with the new build number
export BUILD_NUMBER=$NEW_VERSION

# Write the new version back to the VERSION file
echo "$NEW_VERSION" > VERSION

# Update the version in the package.json file
jq ".version = \"$NEW_VERSION\"" package.json > temp.json && mv temp.json package.json

# Build the Docker image. One for the API and one for the client
docker build --file Dockerfile --build-arg VERSION=$NEW_VERSION -t bisand/bogentech-web:$NEW_VERSION -t bisand/bogentech-web:latest .

# Push the images to Docker Hub
docker push bisand/bogentech-web:$NEW_VERSION
docker push bisand/bogentech-web:latest

# Clean up the images
docker rmi bisand/bogentech-web:latest
docker rmi bisand/bogentech-web:$NEW_VERSION

