#!/usr/bin/env bash

docker run --rm \
  --security-opt seccomp=unconfined \
  -v tigerbeetle-data:/data \
  ghcr.io/tigerbeetle/tigerbeetle \
  format --cluster=0 --replica=0 --replica-count=1 /data/0_0.tigerbeetle