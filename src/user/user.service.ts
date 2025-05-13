import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private repo: Repository<Users>,
  ) {}

  async createUser(user: CreateUserDto) {
    const isUserExist = await this.repo.findOneBy({ email: user.email });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    if (isUserExist) {
      throw new HttpException('Email already used.', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.repo.create({
      ...user,
      password_hashed: hashedPassword,
      password_salt: salt,
    });

    return this.repo.save(newUser);
  }

  async findOne(email: string, password: string) {
    const isUserExist = await this.repo.findOneBy({
      email: email,
    });

    if (isUserExist === null) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const compareHash = await bcrypt.compare(
      password,
      isUserExist.password_hashed,
    );

    if (compareHash) {
      return isUserExist;
    }
    throw new HttpException('Failed to compare hash', HttpStatus.FORBIDDEN);
  }
}
