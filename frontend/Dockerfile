FROM node:23

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . ./app

EXPOSE 3000

CMD ["pnpm", "dev"]