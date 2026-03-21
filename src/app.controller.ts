import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getTest(): string {
    return this.appService.getTest();
  }

  @Post('/')
  postTest(@Body() payload): string {
    return this.appService.postTest(payload.data);
  }
}
