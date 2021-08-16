import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,HttpStatus , ValidationPipe, UsePipes, Res, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
//@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
//@Controller({ host: ':account.example.com' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
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
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: string) {
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
