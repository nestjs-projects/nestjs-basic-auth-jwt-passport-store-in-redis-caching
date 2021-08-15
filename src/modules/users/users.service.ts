import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private repository: UserRepository){
    
  }
  async create(createUserDto: CreateUserDto)  : Promise<User> {
    let newData = await this.repository.create(createUserDto);
    let createdData= await this.repository.save(newData);
    return this._sanitizeUser(createdData);
  }

  async findAll() : Promise<User[]> {
   let  data = await this.repository.find();
   return this._sanitizeUsers(data);
  }

  async findOne(id: number) : Promise<User> {
    try {
      let data = await this.repository.findOne({"id":id});
      return this._sanitizeUser(data);
    } catch (error) {
      throw error;
    }
    
  }

  // à revoir 
  async update(id: number, updateUserDto: UpdateUserDto) {
    let data = await this.findOne(id);
    let updatedData= await this.repository.save({...data, // existing fields
      ...updateUserDto // updated fields
    });
    //let updatedData= await this.repository.update(id, updateUserDto)
    return this._sanitizeUser(updatedData);
  }

  async remove(id: number) : Promise<User | any> {
    let data = await this.findOne(id);
    //return await this.repository.remove(data);
    let dataDeletedResult=  await this.repository.softDelete(data.id);
    let dataDeleted = await this.repository.findOneOrFail({ where: { id }, withDeleted: true });
    dataDeleted= this._sanitizeUser(dataDeleted);
    return {success:true, message:"data deleted succesfull", ...dataDeleted, dataDeletedResult};
  }
 

  private _sanitizeUser(user: User){
    delete user.password;
    return user;
  }
  private _sanitizeUsers(users: User[]){
    var userSanitize = [];
    if (!users || users==null) {
      return users;
    }
    users.forEach((user)=>{
      delete user.password;
      userSanitize.push(user);
    });
    return userSanitize;
  }
}
