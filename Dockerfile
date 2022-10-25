FROM node:alpine

WORKDIR '/web'
RUN pwd
COPY web/package.json .
RUN npm install
COPY web/ .
RUN npm run build

WORKDIR '/server'
COPY server/package.json .

COPY server/ .
RUN ls 
RUN ["rm", "-rf", "client"]
RUN pwd
RUN ls 
RUN ls /web
RUN ["cp", "-av", "/web/build/", "/server"]
RUN ["mv", "-v", "build", "client"]
RUN ls 
RUN ls client
RUN npm install 

CMD ["npm", "run", "start"]