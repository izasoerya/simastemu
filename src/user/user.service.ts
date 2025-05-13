import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private repo: Repository<Users>,
  ) {}

  async createUser(user: CreateUserDto) {
    const isUserExist = await this.repo.findOneBy({ email: user.email });

    if (isUserExist) {
      throw new HttpException('Email already used.', HttpStatus.BAD_REQUEST);
    }

    return this.repo.save(user);
  }
}
