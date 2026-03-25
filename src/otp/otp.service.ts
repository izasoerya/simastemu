import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from './entities/otp.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';
import { ResponseOtpDto } from './dto/response-otp.dto';

@Injectable()
export class OtpService {
  private static readonly OTP_TTL_MS = 180000;

  constructor(
    @InjectRepository(OTP)
    private repo: Repository<OTP>,
  ) {}

  async create(createOtpDto: CreateOtpDto): Promise<ResponseOtpDto> {
    const salt = await bcrypt.genSalt();
    const codeOtp = randomInt(100000, 1000000);
    const hashedOtp = await bcrypt.hash(codeOtp.toString(), salt);
    const expiresOtp = new Date(Date.now() + OtpService.OTP_TTL_MS);

    const otp = this.repo.create({
      email: createOtpDto.email,
      hashedOtp: hashedOtp,
      expiresAt: new Date(Date.now() + OtpService.OTP_TTL_MS),
    });
    const saved = await this.repo.save(otp);
    const resultOtp: ResponseOtpDto = {
      email: saved.email,
      otp: codeOtp.toString(),
      expiresAt: expiresOtp,
    };
    return resultOtp;
  }

  async matchOtp(email: string, otp: string): Promise<boolean> {
    const otpData = await this.repo.findOne({ where: { email: email } });
    if (otpData === null) {
      throw new NotFoundException('OTP Invalid');
    }

    const match = await bcrypt.compare(otp, otpData.hashedOtp);
    return match;
  }

  async update(id: number, updateOtpDto: UpdateOtpDto): Promise<OTP> {
    const otpData = await this.repo.findOne({ where: { id } });
    if (otpData === null) {
      throw new NotFoundException('OTP data not found');
    }

    const now = Date.now();
    const nextAllowedAt = otpData.updatedAt.getTime() + OtpService.OTP_TTL_MS;
    if (now < nextAllowedAt) {
      const waitSeconds = Math.ceil((nextAllowedAt - now) / 1000);
      throw new BadRequestException(
        `Wait for ${waitSeconds} seconds before requesting another OTP`,
      );
    }

    const salt = await bcrypt.genSalt();
    const otpCode = randomInt(100000, 1000000);
    const hashedOtp = await bcrypt.hash(otpCode.toString(), salt);

    const otp = this.repo.merge(otpData, {
      email: updateOtpDto.email,
      hashedOtp,
      expiresAt: new Date(now + OtpService.OTP_TTL_MS),
    });
    const saved = await this.repo.save(otp);
    return saved;
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.repo.delete({ id: id });
    if (deleted.affected == 0) {
      throw new NotFoundException('Resource not found');
    }
    return true;
  }
}
