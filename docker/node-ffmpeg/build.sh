
#!bin/bash
docker build -t gcr.io/sarmiento-musicx/node:14-alpine-ffmpeg -f ./node-ffmpeg.Dockerfile .
docker push gcr.io/sarmiento-musicx/node:14-alpine-ffmpeg