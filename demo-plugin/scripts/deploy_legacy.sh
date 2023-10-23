#!/bin/bash
set -x
set -e

BUILD_PATH=out/
DEPLOY_PATH=/var/www/demoplugin

if [[ -n "$SSH_TARGET" ]]; then
    echo "Deploying to SSH_TARGET: $SSH_TARGET"
else
    echo "Error: The environment variable SSH_TARGET is not set."
    exit -1
fi

ls $BUILD_PATH
rsync -avz --progress $BUILD_PATH $SSH_TARGET:$DEPLOY_PATH

./scripts/clear_cloudflare_cache.sh
