import { HealthersService } from './healthers/healthers.service';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly HealthersService: HealthersService,
  ) {}

  @Get()
  getHello() {
    // return 'Hello World';
    // return this.appService.getHello();
    return this.HealthersService.hiHealtherServiceProduct();
  }
}
