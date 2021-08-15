import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';



@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private repository: UserRepository){}

          /** Register service */
    async register(registerUserDto: RegisterUserDto)  : Promise<User> {
        let newData = await this.repository.create(registerUserDto);
        let createdData = await  this.repository.save(newData);
        return this._sanitizeUser(createdData);
      }


      /** Login service */
      async login(loginUserDto: LoginUserDto) : Promise<User | any> {
        try {
          return await this.repository.findOne({username:loginUserDto.username}); // check user by username
        } catch (error) {
          throw error;
        }
      }

      private _sanitizeUser(user: User){
        delete user.password;
        return user;
      }
    
}