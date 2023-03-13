# base: base node image with pnpm
FROM node:18-bullseye-slim AS base_pnpm

# set for layer base and all layers that inherit from it
ENV NODE_ENV=production

ARG PNPM_VERSION=7.28.0

RUN npm install --no-update-notifier --no-fund --global install pnpm@${PNPM_VERSION}

# deps: install node_modules, including dev dependencies
FROM base_pnpm AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY app/api/package.json app/api/pnpm-lock.yaml ./app/api/
COPY app/client/package.json app/client/pnpm-lock.yaml ./app/client/

RUN pnpm install --production=false

# production_deps: setup production node_modules
FROM base_pnpm AS production_deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY package.json pnpm-lock.yaml ./
COPY app/api/package.json app/api/pnpm-lock.yaml ./app/api/
COPY app/client/package.json app/client/pnpm-lock.yaml ./app/client/

RUN pnpm prune --prod

# build: build the app
FROM base_pnpm AS build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY . .

RUN pnpm run build

# production: build the production image with minimal footprint
FROM node:18-bullseye-slim AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=production_deps /app/node_modules /app/node_modules
COPY --from=build /app/api/dist /app/api/dist
COPY --from=build /app/app/client/build /app/api/dist/client

CMD ["pnpm", "start"]

