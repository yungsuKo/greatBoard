import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-guard.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Response() res) {
    const { access_token } = await this.authService.generateAccessToken(
      req.user,
    );
    const { refresh_token } = await this.authService.generateRefreshToken(
      req.user,
    );
    console.log(Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION));
    res.cookie('refresh_token', refresh_token, {
      expires: new Date(
        Date.now() +
          9 * 60 * 60 * 1000 +
          Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
      ),
      httpOnly: true,
      path: '/auth/access',
    });
    console.log(access_token);
    return res.send({ access_token });
  }

  @Get('/access')
  @UseGuards(AuthGuard('refresh'))
  async getAccessToken(@Req() req) {
    return this.authService.generateAccessToken(req.user);
  }
}
