import { Context } from '@midwayjs/koa';

export class ReqUtil {
    // 以下代码由GPT获取
    static getBrowser(ctx: Context) {
        const userAgent = this.getAgent(ctx);
        if (/Edg/i.test(userAgent)) {
            return 'Microsoft Edge';
        } else if (/Firefox/i.test(userAgent)) {
            return 'Firefox';
        } else if (/Chrome/i.test(userAgent)) {
            return 'Google Chrome';
        } else if (/Safari/i.test(userAgent)) {
            return 'Safari';
        } else {
            return 'Unknown';
        }
    }
    //
    static getOS(ctx: Context) {
        const userAgent = this.getAgent(ctx);
        if (/Windows NT 10\.0/i.test(userAgent)) {
            return 'Windows 10';
        } else if (/Windows NT 6\.2/i.test(userAgent)) {
            return 'Windows 8';
        } else if (/Windows NT 6\.1/i.test(userAgent)) {
            return 'Windows 7';
        } else if (/Windows NT 6\.0/i.test(userAgent)) {
            return 'Windows Vista';
        } else if (/Windows NT 5\.1/i.test(userAgent)) {
            return 'Windows XP';
        } else if (/Macintosh/i.test(userAgent)) {
            return 'Mac OS X';
        } else if (/Linux/i.test(userAgent)) {
            return 'Linux';
        } else {
            return 'Unknown';
        }
    }
    static getIp(ctx: Context) {
        return ctx.ip.replace(/[^0-9.]/g, '');
    }

    static getAgent(ctx: Context) {
        return ctx.header['user-agent'];
    }
}
