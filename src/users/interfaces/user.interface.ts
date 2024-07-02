export enum Role {
  User = 'User',
  Admin = 'Admin',
  Moderator = 'Moderator',
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  createdAt: Date;
  updateAt: Date;
  deletedAt?: Date;
}
