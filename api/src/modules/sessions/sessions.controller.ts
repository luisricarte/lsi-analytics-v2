import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateSessionDto } from './dtos/create-sesssion.dto';
import { EmailOrPasswordIncorrectError } from './errors/email-or-password-incorrect.error';
import { JwtService } from '@nestjs/jwt';

import { UsersMapper } from '../users/users.mapper';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('/sessions')
export class SessionsController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createSessionDto: CreateSessionDto) {
    const user = await this.usersRepository.findByEmail(createSessionDto.email);

    if (!user) {
      throw new EmailOrPasswordIncorrectError();
    }

    const passwordMatch = user.props.password === createSessionDto.password;

    if (!passwordMatch) {
      throw new EmailOrPasswordIncorrectError();
    }

    const payload = { sub: user.props.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: UsersMapper.toHTTP(user),
      accessToken,
    };
  }

  @Get()
  /* @UseGuards(AuthGuard) */
  @HttpCode(HttpStatus.OK)
  public async verify() {
    await this.delay(5000);
    return { a: true };
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}