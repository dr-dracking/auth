import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './interfaces';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.health')
  health() {
    return 'users service is up and running!';
  }

  @MessagePattern('users.create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('users.findAll')
  findAll(@Payload() payload: { paginationDto: PaginationDto; user: User }) {
    const { paginationDto, user } = payload;
    return this.usersService.findAll(paginationDto, user);
  }

  @MessagePattern('users.find.id')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('users.find.username')
  findOneByUsername(@Payload('username') username: string) {
    return this.usersService.findByEmailOrUsername({ username });
  }

  @MessagePattern('users.find.email')
  findOneByEmail(@Payload('email') email: string) {
    return this.usersService.findByEmailOrUsername({ email });
  }

  @MessagePattern('users.find.meta')
  findMeta(@Payload('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneWithMeta(id);
  }

  @MessagePattern('users.find.id.summary')
  findOneWithSummary(@Payload('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneWithSummary(id);
  }

  @MessagePattern('users.update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern('users.remove')
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern('users.restore')
  restore(@Payload('id', ParseUUIDPipe) id: string) {
    return this.usersService.restore(id);
  }
}
