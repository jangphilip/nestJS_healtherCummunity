import { error } from 'console';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { HealthersService } from '../healthers.service';
import { AuthService } from 'src/auth/auth.service';
import { ReadOnlyHealtherDto } from '../dto/healther.dto';
import { HealtherRequestDto } from '../dto/healthers.request.dto';
import { Healther } from '../healthers.schema';

@Controller('healthers')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class HealthersController {
  constructor(
    private readonly healthersService: HealthersService,
    private readonly authService: AuthService,
  ) {}

  // @ApiOperation({ summary: '현재 접속된 헬서' })
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getCurrentHealther(@CurrentUser() Healther): any {
  //   return Healther.readOnlyData;
  // }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyHealtherDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: HealtherRequestDto) {
    console.log(body);
    return await this.healthersService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  // @ApiOperation({ summary: '로그아웃' })
  // @Post('logout')
  // logOut() {
  //   return 'logout';
  // }

  @ApiOperation({ summary: '헬서 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('healthers')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadHealtherImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() healther: Healther,
  ) {
    console.log(files);
    return this.healthersService.uploadImg(healther, files);
  }

  @ApiOperation({ summary: '가입된 모든 헬서 조회' })
  @Get('all')
  getAllHealther() {
    return this.healthersService.getAllHealther();
  }
}
