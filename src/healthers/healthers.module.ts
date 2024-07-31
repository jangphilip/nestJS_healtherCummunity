import { forwardRef, Module } from '@nestjs/common';
import { HealthersService } from './healthers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Healther, HealtherSchema } from './healthers.schema';
import { HealthersRepository } from './healthers.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { HealthersController } from './controller/healthers.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: Healther.name, schema: HealtherSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [HealthersController],
  providers: [HealthersService, HealthersRepository],
  exports: [HealthersService, HealthersRepository],
})
export class HealthersModule {}
