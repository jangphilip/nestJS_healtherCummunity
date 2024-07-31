import { ApiProperty, PickType } from '@nestjs/swagger';
import { Healther } from '../healthers.schema';

export class ReadOnlyHealtherDto extends PickType(Healther, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '66a6f4ee3d14de46855ccfa1',
    description: 'id',
  })
  id: string;
}
