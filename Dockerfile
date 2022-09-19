FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install -g @angular/cli@9.1.4
# Bundle app source
COPY . .

# Build the App
# RUN npm run build

EXPOSE 4000

CMD ng serve --host 0.0.0.0
