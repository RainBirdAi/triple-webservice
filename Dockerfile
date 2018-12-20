# ---------- Base Node ----------
FROM 666909753182.dkr.ecr.eu-west-2.amazonaws.com/yolanda-base:latest
# copy source codes
COPY . /triple-webservice-base
# set working directory
WORKDIR /triple-webservice-base

# install node packages
RUN npm install
RUN rm -f /root/.npmrc

# ---------- Final ----------
FROM node:8.9-alpine
WORKDIR /triple-webservice
COPY --from=0 /triple-webservice-base .
EXPOSE 8888
ENTRYPOINT ["node", "server.js"]
