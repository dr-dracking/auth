<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Auth Microservice

This is a microservice that is responsible for handling user authentication and authorization. It is built using NestJS and Prisma.

## Installation

1. Clone the repository
2. Copy the `.env.template` file to `.env` and fill in the required environment variables
3. Run `pnpm install` to install the dependencies
4. Run `pnpm prisma generate` to generate the Prisma client
5. Run `pnpm prisma migrate dev` to apply the migrations
6. Run `docker compose up -d` to start the database
7. Run `pnpm start:dev` to start the development server
