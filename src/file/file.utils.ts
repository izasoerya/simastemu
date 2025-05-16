import { randomUUID } from 'crypto';
import * as fs from 'fs';

export function ensureDirSync(dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
}

export function generateFileName(file: Express.Multer.File): string {
  return `${Date.now() + '_' + randomUUID() + '_' + file.originalname}`;
}
