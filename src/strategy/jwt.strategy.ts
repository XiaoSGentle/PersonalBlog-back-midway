// src/strategy/jwt.strategy.ts

import { Config } from '@midwayjs/core';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    @Config('jwt')
    jwtConfig;

    async validate(payload) {
        return payload;
    }

    getStrategyOptions(): any {
        return {
            secretOrKey: this.jwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        };
    }
}
