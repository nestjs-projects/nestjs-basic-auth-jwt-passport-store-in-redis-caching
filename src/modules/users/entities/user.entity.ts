import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { Role } from 'src/modules/roles/entities/role.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

// export enum Role {
//   Admin = 'Admin',
//   Moderator = 'Moderator',
//   User = 'User',
// }

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ required: true, description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({required: true,uniqueItems: true,description: 'Username', maxLength:200})
  @Column({ unique: true })
  username: string;


  @ApiProperty({required: true,description: "The user's firstname",})
  @Column({ type: 'varchar', length: 150 })
  firstname: string;

  @ApiProperty({
    required: true,
    description: "The user's lastname",
  })
  @Column('varchar', { length: 200 })
  lastname: string;

  @ApiProperty({
    required: true,
    description: "The user's email address",
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    required: true,
    description: "The user's phone number",
  })
  @Column({ type: 'varchar', length: 150 })
  phone: string;

  @ApiProperty({
    required: true,
    description: '',
    default: true,
  })
  @Column({ type: 'tinyint', default: true  })
  isActive: boolean;
//**** supplementary column */

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @VersionColumn()
  version: number;

  // @ApiProperty({
  //   enum: ['Admin', 'Moderator', 'User'],
  //   description: 'Differents roles of user',
  // })
  // @Column({
  //   type: 'set', //type: "enum"
  //   enum: Role,
  //   //default: Role.name,
  // })
  // @OneToMany(() => Role, (role) => role.name)
  // roles: Role[];

  @ApiProperty({
    required: true,
    description: 'The password the user will use to log in',
  })
  @Column({ type: 'varchar' ,})
  //@Exclude()
  password: string;

  @ApiProperty({
    required: false,
    description: "The user's favorite sports list",
  })
  @Column('simple-array')
  sports: string[];




  /***** HASH password method */
  @BeforeInsert()
  async hashPassword(password: string = this.password) {
    const saltOrRounds = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password , saltOrRounds);
  }

}
