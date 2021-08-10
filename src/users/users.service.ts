import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private repository: UserRepository){}
  async create(createUserDto: CreateUserDto)  : Promise<User> {
    let newData = await this.repository.create(createUserDto);
    return this.repository.save(newData);
  }

  async findAll() : Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number) : Promise<User> {
    try {
      let data = await this.repository.findOneOrFail(id);
      return data;
    } catch (error) {
      throw error;
    }
    
  }

  // à revoir 
  async update(id: number, updateUserDto: UpdateUserDto) {
    let data = await this.findOne(id);
    return this.repository.save({...data, // existing fields
      ...updateUserDto // updated fields
    });
  }

  async remove(id: number) : Promise<User> {
    let data = await this.findOne(id);
    return await this.repository.remove(data);
  }
}
