import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseFileDto } from './dtos/file.dto';

@Injectable()
export class FileService {
  processResponse(file: Express.Multer.File): ResponseFileDto {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const res: ResponseFileDto = {
      path: file.path,
      size: file.size,
    };
    return res;
  }
}
