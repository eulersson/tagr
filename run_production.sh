#!/bin/bash
killall mongod
mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@" &
NODE_ENV=production port=8080 gulp