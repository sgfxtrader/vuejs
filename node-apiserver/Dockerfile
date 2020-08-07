FROM node:lts-alpine

LABEL Author="Joni Liu"
LABEL Version="1.0.0"

# Create and Set working dir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package.json file and package-lock.json (if available)
COPY package*.json ./

# Run NPM install
RUN npm install

# Bundle project files
COPY . .

# Set environment variables
ENV OKTA_ISSUER=https://dev-850265.okta.com/oauth2/default
ENV OKTA_CLIENT_ID=0oanbr1foevIkjf8c4x6

# Expose port
EXPOSE 8081

# Start the apps
CMD [ "node", "server.js" ]
