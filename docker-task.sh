#!/bin/bash

./cron-task.sh
exec busybox crond -f -L /dev/stderr
