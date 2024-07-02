import * as bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  //? Seed users

  //* user with all roles
  await prisma.user.upsert({
    where: { id: '5ff41c62-7d96-4111-a21c-6e2c57bbe55f' },
    update: {
      password: bcrypt.hashSync('Dev@123', 10),
    },
    create: {
      id: '5ff41c62-7d96-4111-a21c-6e2c57bbe55f',
      username: 'dev',
      email: 'dev@google.com',
      password: bcrypt.hashSync('Dev@123', 10),
      roles: [Role.Admin, Role.User, Role.Moderator],
    },
  });

  //* user with user role
  await prisma.user.upsert({
    where: { id: '6dc3d7c4-5ebf-47c2-b850-c4256c80bc04' },
    update: {
      password: bcrypt.hashSync('User@123', 10),
    },
    create: {
      id: '6dc3d7c4-5ebf-47c2-b850-c4256c80bc04',
      username: 'user',
      email: 'user@google.com',
      password: bcrypt.hashSync('User@123', 10),
      roles: [Role.User],
    },
  });

  //* user with admin role
  await prisma.user.upsert({
    where: { id: '6eb6373f-f3fd-4347-ae32-2203eb725024' },
    update: {
      password: bcrypt.hashSync('Admin@123', 10),
    },
    create: {
      id: '6eb6373f-f3fd-4347-ae32-2203eb725024',
      username: 'admin',
      email: 'admin@google.com',
      password: bcrypt.hashSync('Admin@123', 10),
      roles: [Role.Admin],
    },
  });

  //* user with moderator role
  await prisma.user.upsert({
    where: { id: '501b6cd9-cbd5-40be-bc45-6ff7c366b191' },
    update: {
      password: bcrypt.hashSync('Mod@123', 10),
    },
    create: {
      id: '501b6cd9-cbd5-40be-bc45-6ff7c366b191',
      username: 'moderator',
      email: 'moderator@google.com',
      password: bcrypt.hashSync('Mod@123', 10),
      roles: [Role.Moderator],
    },
  });
};

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
