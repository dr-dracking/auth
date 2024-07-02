import { User } from '@prisma/client';

export interface JwtPayload {
  id: string;
}

export interface AuthResponse {
  token: string;
  user: User; // TODO: Define user interface
}
