import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { FileService } from './file.service';
import { ensureDirSync, generateFileName } from './file.utils';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('get/:path')
  getFile(@Param('path') filePath: string) {
    return this.fileService.findOne(filePath);
  }

  @UseGuards(AuthGuard)
  @Post('upload/:type')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const type = req.params.type;
          const baseDir = process.env.UPLOAD_DIR || './uploads';
          const dest = `${baseDir}/inventory/${type}`;
          ensureDirSync(dest);
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const type = req.params.type;
          const uniqueSuffix = generateFileName(file);
          const ext = extname(file.originalname);
          cb(null, `${type}_${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
          skipMagicNumbersValidation: true,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.processResponse([file]);
  }

  @UseGuards(AuthGuard)
  @Post('uploads/:type')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const type = req.params.type;
          const baseDir = process.env.UPLOAD_DIR || './uploads';
          const dest = `${baseDir}/inventory/${type}`;
          ensureDirSync(dest);
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const type = req.params.type;
          const uniqueSuffix = generateFileName(file);
          const ext = extname(file.originalname);
          cb(null, `${type}_${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
          skipMagicNumbersValidation: true,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File[],
  ) {
    return this.fileService.processResponse(file);
  }
}
