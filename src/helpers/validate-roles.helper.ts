import { Role } from '@prisma/client';

export const hasRoles = (userRoles: Role[], validRoles: Role[]) => {
  return userRoles.some((role) => validRoles.includes(role));
};
