# start from the official Node.js image
FROM node:latest

# set working directory
WORKDIR /frontend

# copy package.json and package-lock.json
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# start the app
CMD ["npm", "start"]