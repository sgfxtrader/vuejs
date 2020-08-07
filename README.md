### Introduction

Frontend Vuejs, Backend Nodejs Api server with MongoDB Authentication using OKTA JWT validation.

### Pre-requisites

- A NodeJS installed. See installation guide [here](https://nodejs.org/en/download/).
- A MongoDB Community Edition installed. See installation guide [here](https://docs.mongodb.com/manual/administration/install-community/).
- A local Docker development environment running Linux containers. Docker provides packages that configure Docker on a [Mac](https://docs.docker.com/docker-for-mac/), [Windows](https://docs.docker.com/docker-for-windows/), or [Linux](https://docs.docker.com/engine/installation/#supported-platforms) system.

### Instructions (local)

Do `git clone` this repository, you should have `vuejs` folder. 
Also make sure local MongoDB service is up and running before proceed.

Run Vue WebApp UI:

> $ cd vuejs/vue-webapp

> $ npm install

> $ npm run dev

Run Node.js API:

> $ cd vuejs/vue-webapp/src

> $ node server.js

Navigate to `http://localhost:8080/` to access this vue webapp index.

### Instructions (docker)

Do `git clone` this repository, you should have `vuejs` folder.

> $ cd vuejs/vue-webapp

> $ docker-compose up -d

Navigate to `http://localhost:8080/` to access this vue webapp index.

Clean-up resources

> $ docker-compose down