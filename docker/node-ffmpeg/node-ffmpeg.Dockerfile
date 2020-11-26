FROM node:14-alpine

RUN apk update && \
  apk add --no-cache ffmpeg
RUN rm -rf /var/cache/apk/*

CMD [ "node" ]