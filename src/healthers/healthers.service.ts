import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HealtherRequestDto } from './dto/healthers.request.dto';
import { Healther } from './healthers.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { HealthersRepository } from './healthers.repository';

@Injectable()
export class HealthersService {
  constructor(private readonly healthersRepository: HealthersRepository) {}

  async getAllHealther() {
    const allHealther = await this.healthersRepository.findAll();
    const readOnlyHealthers = allHealther.map(
      (healther) => healther.readOnlyData,
    );
    return readOnlyHealthers;
  }

  async uploadImg(healther: Healther, files: Express.Multer.File[]) {
    const fileName = `healthers/${files[0].filename}`;
    console.log(fileName);
    const newHealther = await this.healthersRepository.findByIdAndUpdateImg(
      healther.id,
      fileName,
    );
    console.log(newHealther);
    return newHealther;
  }

  async signUp(body: HealtherRequestDto) {
    const { email, name, password } = body;
    const isHealtherExist = await this.healthersRepository.existsByEmail(email);

    if (isHealtherExist) {
      throw new UnauthorizedException('해당하는 헬서는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const healther = await this.healthersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return healther.readOnlyData;
  }

  hiHealtherServiceProduct() {
    return 'hello healther';
  }
}
