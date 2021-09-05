#!/bin/bash

npm run build
exec busybox crond -f -L /dev/stderr
