import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: User, response: Response) {
    const expires =
      new Date().getTime() +
      Number(this.configService.getOrThrow<number>('JWT_EXPIRATION'));

    const tokenPayload: TokenPayload = {
      _id: user._id,
      email: user.email,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: new Date(expires),
    });

    return {
      access_token: token,
    };
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
    return {
      logout: true,
    };
  }
}
