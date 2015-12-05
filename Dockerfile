FROM node:4.2

EXPOSE 4010

WORKDIR /src

COPY . /src

RUN npm install

CMD npm start