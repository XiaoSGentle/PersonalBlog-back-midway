import { Config, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class JwtUtil {
    @Config('jwt')
    jwt: any;

    @Inject()
    jwtService: JwtService;
    /**
     * JsonWebToken Sign
     * https://github.com/auth0/node-jsonwebtoken
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    jwtSign(sign: any): any {
        return this.jwtService.sign(sign, this.jwt.secret, {
            expiresIn: 1000 * 24,
        });
    }
    /**
     * JsonWebToken Verify
     * https://github.com/auth0/node-jsonwebtoken
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    jwtVerify(token: string): any {
        return this.jwtService.verify(
            token,
            this.jwt.secret,
            this.jwt.expiresIn
        );
    }
    /**
     * JsonWebToken decode
     * https://github.com/auth0/node-jsonwebtoken
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    jwtDecode(token: string): any {
        return this.jwtService.decode(token, this.jwt.secret);
    }
}
