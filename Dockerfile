FROM node:4.2

EXPOSE 8080

WORKDIR /src

COPY . /src

RUN npm install

CMD npm start