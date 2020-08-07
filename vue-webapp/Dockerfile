FROM node:lts-alpine

LABEL Author="Joni Liu"
LABEL Version="1.0.0"

# Install simple http server for serving static content
RUN npm install -g http-server-spa

# Create and Set working dir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package.json file and package-lock.json (if available)
COPY package*.json ./

# Run NPM install
RUN npm install

# Bundle vue dist folder
COPY . .

# For Vue project, the environment variables were configured in project_folder/config/***.env.js file
# Rebuild app for any modification of varibles in ***.env.js file content

# Build app for production with minification
RUN npm run build

# Expose port
EXPOSE 8080

# Start http-server-spa
CMD [ "http-server-spa", "dist", "index.html" ]
