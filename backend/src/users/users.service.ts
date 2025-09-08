import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(dto: CreateUserDto): User {
    const id = this.users.length
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
    const newUser = { id, ...dto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, dto: UpdateUserDto): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`User with id ${id} not found`);
    this.users[index] = { ...this.users[index], ...dto };
    return this.users[index];
  }

  remove(id: number) {
    const exists = this.users.some((u) => u.id === id);
    if (!exists) throw new NotFoundException(`User with id ${id} not found`);
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: true };
  }
}
