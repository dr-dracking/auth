import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [NatsModule],
})
export class UsersModule {}
