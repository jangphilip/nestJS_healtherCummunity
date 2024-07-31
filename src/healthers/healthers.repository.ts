import { InjectModel } from '@nestjs/mongoose';
import { Healther } from './healthers.schema';
import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { HealtherRequestDto } from './dto/healthers.request.dto';

@Injectable()
export class HealthersRepository {
  constructor(
    @InjectModel(Healther.name) private readonly healtherModel: Model<Healther>,
  ) {}

  async findAll() {
    return await this.healtherModel.find();
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const healther = await this.healtherModel.findById(id);

    healther.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newHealther = await healther.save();
    console.log(newHealther);
    return newHealther.readOnlyData;
  }

  async findHealtherByIdWithoutPassword(
    healtherId: string,
  ): Promise<Healther | null> {
    const healther = await this.healtherModel
      .findById(healtherId)
      .select('-password');
    return healther;
  }

  async findHealtherByEmail(email: string): Promise<Healther | null> {
    const healther = await this.healtherModel.findOne({ email });
    return healther;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.healtherModel.exists({ email });
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async create(healther: HealtherRequestDto): Promise<Healther> {
    return await this.healtherModel.create(healther);
  }
}
