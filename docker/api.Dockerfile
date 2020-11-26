# BASE IMAGE 
FROM node:14-alpine
# WORKING DIRECTORY OF THE SERVICE
WORKDIR /pes

# COPY NECESSARY FILES TO RUN SERVICE
COPY package.json .
COPY packages/common/package.json packages/common/
COPY packages/api/package.json packages/api/

#SEVICE BUILDING INSTRUCTIONS
RUN yarn install --prod

# DO SOME REORGANIZATION
COPY packages/common/dist packages/common/
COPY packages/api/dist packages/api/

# MOVE PRODUCTION FILES TO A NEW CONTAINER AND THUS REDUCE CONTAINER SIZE
FROM gcr.io/sarmiento-musicx/node:14-alpine-ffmpeg
WORKDIR /pes
COPY --from=0 /pes .

# WORKING DIRECTORY OF THE SERVICE (PRODUCTION)
WORKDIR ./packages/api

# PORT
EXPOSE 4000

# COMMAND
CMD [ "node", "index.js" ]