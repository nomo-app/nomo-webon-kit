#!/bin/bash
set -x
set -e

# Deploy url: https://nomo.app/webons/app.nomo.demowebon/manifest

if [[ -n "$SSH_TARGET" ]]; then
    echo "Deploying to SSH_TARGET: $SSH_TARGET"
else
    echo "Error: The environment variable SSH_TARGET is not set."
    exit -1
fi

RELEASE_FILE=public/nomo_manifest.json
DEPLOY_PATH="/var/www/html/webons/"

# Get webon_id value from the JSON file
webon_id=$(jq -r '.webon_id' "$RELEASE_FILE")

# Copy the nomo_manifest.json file to the manifest file
cp "$RELEASE_FILE" "public/manifest"

# Construct the remote deployment path
REMOTE_DEPLOY_PATH="$DEPLOY_PATH$webon_id/"

# Create the directory if it doesn't exist
ssh "$SSH_TARGET" "mkdir -p $REMOTE_DEPLOY_PATH"

# Check if the file exists
if [ -f "public/manifest" ]; then
    echo "Release file copied to manifest"

    # Deploy the file to the remote directory
    scp "public/manifest" "$SSH_TARGET:$REMOTE_DEPLOY_PATH"

    # Remove the local manifest file after successful deployment
    rm "public/manifest"
    echo "Local manifest file removed"
else
    echo "Error: public/manifest does not exist."
    exit -1
fi

./scripts/clear_cloudflare_cache.sh
