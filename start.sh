#!/bin/bash

set -e

# Create server
echo "$PWD"
ls

# -p for creating if not present and ignore if exists
mkdir -p "$PWD/probe-deployment/files/dbs"
export PROMETHEUS_MULTIPROC_DIR="$PWD/probe-deployment/files/dbs"

## Processes needs to be multi threaded because we have to keep server up and running when we run
python3 /app/probe-deployment/files/exporter.py &

while [ True ]; do
    echo "Starting Tests"
    npx wdio wdio.conf.js --suite PROBE || {
        echo "Tests Failed !!!"
    }
    sleep 1000
done

while sudo fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do
    echo "Waiting to get lock /var/lib/dpkg/lock-frontend..."
    sleep 5
done

sudo apt-get update
