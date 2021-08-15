import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,HttpStatus , ValidationPipe, UsePipes, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@ApiTags('users')
@Controller('users')
//@Controller({ host: ':account.example.com' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiCreatedResponse()
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @ApiBody({ type: [CreateUserDto] })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  //@Redirect('https://nestjs.com', 301)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  // @Get()
  // findAll(@Res() res: Response) {
  //    res.status(HttpStatus.OK).json([]);
  // }
}
