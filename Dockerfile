FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied 
COPY package*.json ./
# Install dependencies
RUN npm install
# Bundle app source
COPY . .
# Expose port to be mapped by docker daemon
EXPOSE 8080
# Run application
CMD ["npm", "run", "start"]