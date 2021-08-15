import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Role extends BaseEntity {

    @ApiProperty({ required: true, description: 'Role ID' })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({
      required: true,
      uniqueItems: true,
      description: 'role name',
    })
    @PrimaryColumn()
    name: string;
    
    @ApiProperty({
      description: 'Indicates whether the cashier role is active or not',
      required: true,
      default: true,
    })
    @Column({ type: 'tinyint' })
    isActive: boolean;
  
}
