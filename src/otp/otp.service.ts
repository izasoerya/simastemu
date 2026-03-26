import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpsertOtpDto } from './dto/upsert-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from './entities/otp.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';
import { ResponseOtpDto } from './dto/response-otp.dto';
import { OtpQueryDto } from './dto/query-otp.dto';

@Injectable()
export class OtpService {
  private static readonly OTP_TTL_MS = 180000;

  constructor(
    @InjectRepository(OTP)
    private repo: Repository<OTP>,
  ) {}

  private async create(email: string): Promise<ResponseOtpDto> {
    const salt = await bcrypt.genSalt();
    const codeOtp = randomInt(100000, 1000000);
    const hashedOtp = await bcrypt.hash(codeOtp.toString(), salt);
    const expiresOtp = new Date(Date.now() + OtpService.OTP_TTL_MS);

    const otp = this.repo.create({
      email: email,
      hashedOtp: hashedOtp,
      expiresAt: new Date(Date.now() + OtpService.OTP_TTL_MS),
    });
    const saved = await this.repo.save(otp);

    const response: ResponseOtpDto = {
      email: saved.email,
      otp: codeOtp.toString(),
      expiresAt: expiresOtp,
    };
    return response;
  }

  async matchOtp(email: string, otp: string): Promise<boolean> {
    const otpData = await this.repo.findOne({ where: { email: email } });
    if (otpData === null) {
      throw new NotFoundException('OTP Invalid');
    }

    const match = await bcrypt.compare(otp, otpData.hashedOtp);
    return match;
  }

  async upsert(upsertOtpDto: UpsertOtpDto): Promise<ResponseOtpDto> {
    const otpData = await this.repo.findOne({
      where: { email: upsertOtpDto.email },
    });
    if (otpData === null) {
      return this.create(upsertOtpDto.email);
    } else if (Date.now() < otpData.expiresAt.getTime()) {
      throw new ForbiddenException('Wait for 3 minute');
    }

    await this.remove({ email: upsertOtpDto.email });
    return this.create(upsertOtpDto.email);
  }

  async remove(query: OtpQueryDto): Promise<boolean> {
    const where: any = {};
    if (query.id) where.uid = query.id;
    if (query.email) where.email = query.email;

    if (Object.keys(where).length === 0) {
      throw new BadRequestException('At least one query field is required');
    }

    const deleted = await this.repo.delete(where);
    if (deleted.affected == 0) {
      throw new NotFoundException('Resource not found');
    }
    return true;
  }
}
