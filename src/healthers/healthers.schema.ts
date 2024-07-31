import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Healther extends Document {
  @ApiProperty({
    example: 'emailname@hamail.net',
    description: 'email',
    required: true,
  })
  @Prop({
    require: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'jangphilip',
    description: 'name',
    required: true,
  })
  @Prop({
    require: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'password1234#',
    description: 'password',
    required: true,
  })
  @Prop({
    require: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2FNestJS&psig=AOvVaw0OZF1WqmJJz1EzRC-Pk3ki&ust=1722468168673000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCvwo30z4cDFQAAAAAdAAAAABAW',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const HealtherSchema = SchemaFactory.createForClass(Healther);

HealtherSchema.virtual('readOnlyData').get(function (this: Healther) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
