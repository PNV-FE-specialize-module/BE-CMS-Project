# Base image
    FROM node:18

    # Create app directory
    WORKDIR /usr/src/app

    # A wildcard is used to ensure both package.json AND yarn.lock are copied
    COPY package.json package-lock.json ./

    # Install app dependencies using yarn
    RUN npm install

    # Bundle app source
    COPY . .

    # Creates a "dist" folder with the production build
    RUN npm run build

    EXPOSE 3000

    # Start the server using the production build
    CMD [ "node", "dist/main.js" ]