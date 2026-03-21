import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  postTest(payload: string): string {
    return `BACKEND: ${payload}`;
  }

  getTest(): string {
    return 'GET success!';
  }
}
