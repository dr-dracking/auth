import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { envs } from 'src/config';
import { ObjectManipulator } from 'src/helpers';
import { LoginDto } from './dto';
import { AuthResponse, JwtPayload } from './interfaces';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database \\(^.^)/');
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      const { username, password } = loginDto;

      const user = await this.user.findUnique({ where: { username } });

      if (!user)
        throw new RpcException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        });

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword)
        throw new RpcException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        });

      ObjectManipulator.safeDelete(user, 'password');

      return { user, token: await this.signToken({ id: user.id }) };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      ObjectManipulator.safeDelete(payload, 'exp');
      ObjectManipulator.safeDelete(payload, 'iat');

      const user = await this.user.findUnique({ where: { id: payload.id } });

      if (!user) {
        throw new RpcException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid token',
        });
      }

      return {
        user: user,
        token: await this.signToken({ id: user.id }),
      };
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
      });
    }
  }

  private async signToken(payload: JwtPayload, expiresIn: string | number = '4h') {
    return this.jwtService.sign(payload, { expiresIn });
  }
}
