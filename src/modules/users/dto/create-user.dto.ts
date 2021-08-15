
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsOptional, IsBoolean, IsDate, MaxLength, IsNotEmpty, IsEmail, IsNumberString, IsPhoneNumber, IsUUID, IsArray, MinLength, Matches } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';


export class CreateUserDto {

  @ApiProperty({ required: true, description: 'User ID' })
  id: number;

  @ApiProperty({required: true,uniqueItems: true,description: 'Username', maxLength:200})
  @IsString({message:"name is a string"})
  @IsNotEmpty({message:"username cann't be blank"})
  @MaxLength(200)
  username:string


  @ApiProperty({required: true,description: "The user's firstname",})
  @IsString({message:"name is a string"})
  @IsNotEmpty({message:"firstname cann't be blank"})
  firstname: string;

  @ApiProperty({required: true,description: "The user's lastname",})
  @IsString({message:"lastname is a string"})
  @IsNotEmpty({message:"lastname cann't be blank"})
  lastname: string;

  @ApiProperty({required: true,description: "The user's email address",})
  @IsEmail()
  @IsNotEmpty({message:"email cann't be blank"})
  email: string;

  @ApiProperty({
    required: true,
    description: "The user's phone number",
  })
  @IsNotEmpty({message:"phone cann't be blank"})
  //@IsNumberString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    required: true,
    description: '',
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updatedDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  deletedDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  version: number;

  // @ApiProperty({enum: ['Admin', 'Moderator', 'User'],description: 'Differents roles of user',})
  // @IsArray()
  // roles: Role[];

  @ApiProperty({required: true,description: 'The password the user will use to log in',})
  @IsNotEmpty({message:"password cann't be blank"})
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {message:'le mot de passe doit contenir au moins 8 caractères, au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre'})
  password: string;

  @ApiProperty({required: false,description: "The user's favorite sports list",})
  @IsArray()
  @IsOptional()
  sports: string[];

  
}