
import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString({message:'name is a string'}) readonly name: string;
}