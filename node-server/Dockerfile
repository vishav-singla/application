FROM node

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libreoffice \
    unoconv \
    python3 \
    && rm -rf /var/lib/apt/lists/*

RUN chmod +x /usr/bin/unoconv

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
