#!/bin/bash
set -x
set -e

RELEASE_DIR=out/
DEPLOY_PATH=/var/www/demoplugin

if [[ -n "$SSH_TARGET" ]]; then
    echo "Deploying to SSH_TARGET: $SSH_TARGET"
else
    echo "Error: The environment variable SSH_TARGET is not set."
    exit -1
fi

ls $RELEASE_DIR # ls to check if release-directory exists
rsync -avz --progress $RELEASE_DIR $SSH_TARGET:$DEPLOY_PATH

./scripts/clear_cloudflare_cache.sh
