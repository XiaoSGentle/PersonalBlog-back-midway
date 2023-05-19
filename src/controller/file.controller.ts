import { Controller, Files, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { FileService } from '../service/file.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

@Controller('/')
export class HomeController {
    @Inject()
    ctx: Context;

    @Inject()
    fileService: FileService;

    @Post('/upload')
    async upload(@Files() files) {
        // 仅限一个文件传输
        const filePath: string = files[0].data;
        const fileName: string = files[0].filename;
        return ApiResult.ok(
            await this.fileService.uploadCos(filePath, fileName)
        );
    }
}
