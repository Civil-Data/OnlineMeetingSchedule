FROM node

WORKDIR /app/meetings

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "start"]