import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('test')
@Controller('/test')
export class TestController {
  constructor(private readonly appService: TestService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns test message' })
  getTest(): string {
    return this.appService.getTest();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Returns test payload' })
  postTest(@Body() payload): string {
    return this.appService.postTest(payload.data);
  }
}
