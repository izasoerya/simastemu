import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseFileDto } from './dtos/file.dto';
import * as fs from 'fs';
import * as path from 'path';
import { StreamableFile, NotFoundException } from '@nestjs/common';

@Injectable()
export class FileService {
  findOne(filePath: string): StreamableFile {
    const dbName = process.env.UPLOAD_DIR;
    if (!dbName) {
      throw new HttpException(
        'DB_NAME env not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Get x = prefix before first '_'
    const x = filePath.split('_')[0];
    const y = filePath;

    // Construct the absolute path (add 'inventory')
    const absolutePath = path.resolve(process.cwd(), dbName, 'inventory', x, y);

    if (!fs.existsSync(absolutePath)) {
      throw new NotFoundException('File not found');
    }
    const fileStream = fs.createReadStream(absolutePath);
    return new StreamableFile(fileStream);
  }

  processResponse(file: Express.Multer.File[]): ResponseFileDto[] {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    if (file.length === 1) {
      const res: ResponseFileDto = {
        path: file[0].filename,
        size: file[0].size,
      };
      return [res];
    } else {
      const res: ResponseFileDto[] = file.map((e) => ({
        path: e.filename,
        size: e.size,
      }));
      return res;
    }
  }
}
