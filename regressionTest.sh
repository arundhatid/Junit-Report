#!/bin/bash

set -e

# Create server
echo "$PWD"
ls


echo "Starting Tests"
npx wdio wdio.conf.js --suite REGRESSION || {
    echo "Tests Failed !!!"
}
