# base: base node image with pnpm
FROM node:18-bullseye-slim AS base_pnpm

# set for layer base and all layers that inherit from it
ENV NODE_ENV=production

ARG PNPM_VERSION=7.28.0

RUN npm install --no-update-notifier --no-fund --global install pnpm@${PNPM_VERSION}

# deps: install node_modules, including dev dependencies
FROM base_pnpm AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY app/api/package.json ./app/api/
COPY app/client/package.json ./app/client/
COPY package/eslint-config-custom/package.json ./package/eslint-config-custom/
COPY package/tsconfig ./package/tsconfig/

RUN pnpm install --production=false

# production_deps: setup production node_modules
FROM base_pnpm AS production_deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY app/api/package.json ./app/api/
COPY app/client/package.json ./app/client/
COPY package/eslint-config-custom/package.json ./package/eslint-config-custom/
COPY package/tsconfig ./package/tsconfig/

RUN pnpm prune --prod
RUN pnpm pnpm install --production=true

# build: build the app
FROM base_pnpm AS build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/app/api/node_modules /app/app/api/node_modules
COPY --from=deps /app/app/client/node_modules /app/app/client/node_modules
COPY . .

RUN pnpm run build

CMD ["node", "./app/api/dist/server.js"]

# production: build the production image with minimal footprint
# FROM node:18-bullseye-slim AS production
#
# WORKDIR /app
#
# ENV NODE_ENV=production
#
# COPY --from=production_deps /app/node_modules /app/node_modules
# COPY --from=production_deps /app/app/api/node_modules /app/api/node_modules
#
# COPY --from=build /app/app/api/dist /app/api/dist
#
# CMD ["node", "./api/dist/server.js"]

