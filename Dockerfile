FROM node:20.18-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

EXPOSE 8080

RUN pnpm install

CMD ["pnpm", "dev"]

