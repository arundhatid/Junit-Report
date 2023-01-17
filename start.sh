#!/bin/bash

set -e

# Create server
echo "$PWD"
ls

mkdir "$PWD/probe-deployment/files/dbs"
export PROMETHEUS_MULTIPROC_DIR="$PWD/probe-deployment/files/dbs"

## Processes needs to be multi threaded because we have to keep server up and running when we run
python3 /app/probe-deployment/files/exporter.py &

while [ True ]; do
    echo "Check directory"
    if [ -z "$(ls -A $PWD/probe-deployment/files/dbs)" ]; then
        echo "DBs directory is empty"
    else
        echo "DBs directory is not empty"
        rm -rf $PWD/probe-deployment/files/dbs/
        mkdir -p "$PWD/probe-deployment/files/dbs"
    fi
    echo "Starting Tests"
    npx wdio wdio.conf.js --suite PROBE || {
        echo "Tests Failed !!!"
    }
    sleep 1000
done
