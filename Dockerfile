# FROM 'node:16-alpine'
FROM 'public.ecr.aws/docker/library/node:16'


WORKDIR /app
COPY package.json ./

RUN npm install

COPY tsconfig.json ./
copy config ./config
COPY src ./src
COPY rds-combined-ca-bundle.pem ./

# RUN npm run test

EXPOSE 3000

CMD ["npx", "ts-node", "./src/index.ts"]

