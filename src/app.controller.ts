import { Controller, Get, Post, Render, Res, Body, HttpStatus, Req, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './app.entity';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private jwtService: JwtService) { }

  @Get()
  @Render('index')
  root() { }

  @Get('/verify')
  @Render('verify')
  VarifyEmail() { }

  @Post('/signup')
  async Signup(@Body() user: User) {
   return await this.appService.signup(user);
  }

  @Post('/signin')
  async Signin(@Body() user: User) {
    return await this.appService.signin(user, this.jwtService);
  }

  @Post('/verify')
  async Varify(@Body() body) {
    return await this.appService.varifyAccount(body.code) 
  }

  @Get('/:id')
  async getOneUser(@Res() response, @Param() param) {
    const user = await this.appService.getOne(param.id)
    return response.status(HttpStatus.CREATED).json({
      user
    })
  }
}
