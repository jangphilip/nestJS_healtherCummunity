import { PickType } from '@nestjs/swagger';
import { Healther } from 'src/healthers/healthers.schema';

export class LoginRequestDto extends PickType(Healther, [
  'email',
  'password',
] as const) {}
