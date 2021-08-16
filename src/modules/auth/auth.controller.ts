import { BadRequestException, Body, Controller, Get, Post, Req, Res, UsePipes, ValidationPipe, 
  UnauthorizedException, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
const circularJSON = require('circular-json');
import { Cache } from 'cache-manager';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
      private jwtService: JwtService,private usersService: UsersService,
      @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    /** register controller */
    @Post('register')
    @ApiCreatedResponse()
    //@UsePipes(ValidationPipe)
    @ApiBody({ type: [RegisterUserDto] })
    register(@Body() registerUserDto: RegisterUserDto) {
      return this.authService.register(registerUserDto);
    }
  

    /** login controller */
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
      
      let user = await this.authService.login(loginUserDto);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      let isMatch = await bcrypt.compare(loginUserDto.password, user.password); // compare password
      if (!isMatch) {
        console.log(isMatch);
        throw new BadRequestException('Invalid credentials');
      }

      /*** Generate token */
      const payload = { username: user.username, id: user.id };
      const jwt=this.jwtService.sign(payload); // jwt
      
      //access_token: this.jwtService.sign(payload),
      await this.cacheManager.set('jwt', jwt, { ttl: 1000 });
      console.log("mon cache : "+ await this.cacheManager.set('jwt', jwt));
      
      // response.cookie('jwt', jwt, {httpOnly:true, 
      //   expires: new Date(Date.now() + 60000),// would expire after 1 minutes
      //   //maxAge: 60000, 
      // }) // set cookie
      return {
        message:'Success jwt generated!',
        //jwt
      };
    }
    @Get('profile')
    async profile(@Req() request : Request){
      try {
       // const cookieApp = request.cookies['jwt'];
        const cookieApp = await this.cacheManager.get('jwt');
        console.log("cache recuperé:  " + cookieApp);
        
        if (!cookieApp) {
          throw new BadRequestException('JWT not found');
        }
      let data = await this.jwtService.verifyAsync(cookieApp)
      if (!data) {
        throw new UnauthorizedException();
      }
     let user = await this.usersService.findOne(data['id']);
      return user;
    //return circularJSON.stringify(request.cookies['jwt']) ;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response : Response){
      //response.clearCookie('jwt');
      await this.cacheManager.del('key');
      console.log("cache supprimé  :" +await this.cacheManager.del('key'));
      
      return {
        message:"Success logout !"
      };

    }

}
