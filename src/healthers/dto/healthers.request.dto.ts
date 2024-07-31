import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Healther } from '../healthers.schema';

export class HealtherRequestDto extends PickType(Healther, [
  'email',
  'name',
  'password',
] as const) {}
