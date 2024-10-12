FROM node:20.13.1-alpine

WORKDIR /app

COPY ./app/package.json ./

RUN npm install --legacy-peer-deps

COPY ./app .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
