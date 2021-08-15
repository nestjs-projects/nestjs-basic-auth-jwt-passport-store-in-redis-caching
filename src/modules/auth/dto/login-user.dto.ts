import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
export class LoginUserDto extends PartialType(RegisterUserDto) {}
// export class LoginUserDto {

//     @ApiProperty({required: true,uniqueItems: true,description: 'Username', maxLength:200})
//     @IsString({message:"name is a string"})
//     @IsNotEmpty({message:"username cann't be blank"})
//     @MaxLength(200)
//     username:string

//     @ApiProperty({required: true,description: 'The password the user will use to log in',})
//     @IsNotEmpty({message:"password cann't be blank"})
//     password: string;
// }
