import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RoleRepository) private readonly repository: RoleRepository){}
  async create(createRoleDto: CreateRoleDto)  : Promise<Role> {
    let newData = await this.repository.create(createRoleDto);
    return this.repository.save(newData);
  }

  async findAll() : Promise<Role[]> {
    return this.repository.find();
  }

  async findOne(id: number) : Promise<Role> {
    try {
      let data = await this.repository.findOneOrFail(id);
      return data;
    } catch (error) {
      throw error;
    }
    
  }

  // à revoir 
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    let data = await this.findOne(id);
    return this.repository.save({...data, // existing fields
      ...updateRoleDto // updated fields
    });
  }

  async remove(id: number) : Promise<Role> {
    let data = await this.findOne(id);
    return await this.repository.remove(data);
    //return await this.repository.softDelete(data);
  }
}
