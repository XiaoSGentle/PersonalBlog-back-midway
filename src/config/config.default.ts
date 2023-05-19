import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
    // use for cookie sign key, should change to your own and keep security
    keys: '1683070993598_5853',
    // 自定义配置
    userconfig: {
        // 腾讯云cos对象存储桶配置
        cos: {
            Bucket: 'xiaos-1314769426',
            Region: 'ap-nanjing',
        },
    },
    koa: {
        port: 8888,
        globalPrefix: '/api',
    },
    // 数据库配置
    typeorm: {
        dataSource: {
            default: {
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'personal_blog',
                synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
                logging: false,
                entities: ['entity'],
                charset: 'utf8mb4', // 设置字符集为UTF-8
                collation: 'utf8mb4_unicode_ci', // 设置排序规则为UTF-8
            },
        },
    },
    // jwt配置
    jwt: {
        secret: 'reacool',
        expiresIn: 60 * 60 * 24,
    },
    // swagger配置
    swagger: {
        title: '基于MidWay.js和Vue.js开发的个人博客',
        description: '晴天😁😁😁',
        // 开启认证则取消注释下三行
        auth: {
            authType: 'bearer',
        },
    },
    // 腾讯云存储桶
    cos: {
        client: {
            SecretId: 'AKIDQhpiBQQCk37xZw4xdT4RaU9ZkiRyIOdy',
            SecretKey: 'IND0jGcotnZ7RXO9h2FNJDyVntkNl02C',
        },
    },
    // 跨域
    cors: {
        credentials: false,
    },
    // ？
    jsonp: {
        callback: 'jsonp',
        limit: 512,
    },
    // 文件上传的参数配置
    upload: {
        // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
        mode: 'file',
        // fileSize: string, 最大上传文件大小，默认为 10mb
        fileSize: '1000mb',
        // whitelist: string[]，文件扩展名白名单
        // 扩展名白名单
        whitelist: null,
        // tmpdir: string，上传的文件临时存储路径
        tmpdir: join(process.cwd(), 'uploads'),
        // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
        cleanTimeout: 5 * 60 * 1000,
        // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
        base64: false,
        // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
        match: /\/api\/upload/,
    },
} as MidwayConfig;
