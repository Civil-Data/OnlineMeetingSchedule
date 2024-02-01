FROM node:18

WORKDIR /app/meetings

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "start"]