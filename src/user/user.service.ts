import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UserQueryDto } from './dtos/user.dto';
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

  async findOne(query: UserQueryDto): Promise<Users | null> {
    const where: any = {};
    if (query.uid) where.uid = query.uid;
    if (query.email) where.email = query.email;
    return this.repo.findOne({ where });
  }
}
