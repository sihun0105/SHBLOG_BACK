import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appservice: AppService) {}

  @Post('/')
  async getHello() {
    return this.appservice.getHello();
  }
}