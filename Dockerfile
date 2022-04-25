FROM node:13.12.0-alpine

# set working directory
WORKDIR /task-tracker-front

# add `/app/node_modules/.bin` to $PATH
ENV PATH /task-tracker-front/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]