import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { HealthersRepository } from 'src/healthers/healthers.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly healthersRepository: HealthersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const healther =
      await this.healthersRepository.findHealtherByIdWithoutPassword(
        payload.sub,
      );

    if (healther) {
      return healther;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
