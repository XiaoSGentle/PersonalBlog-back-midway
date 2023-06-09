import { Controller, Files, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiBearerAuth, ApiTags } from '@midwayjs/swagger';
import { FileService } from '../service/file.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { getUUID } from '../util/Other/Utils';

@ApiBearerAuth()
@ApiTags('文件')
@Controller('/')
export class FileController {
    @Inject()
    ctx: Context;

    @Inject()
    fileService: FileService;

    @Post('/upload')
    async upload(@Files() files: any) {
        // TODO:仅限一个文件传输，后续更改
        const filePath: string = files[0].data;
        // 获取并重命名文件
        let fileName: string = files[0].filename;
        const index: number = fileName.lastIndexOf('.');
        const fileNameChip = [
            fileName.slice(0, index),
            fileName.slice(index + 1),
        ];
        fileName = getUUID() + '.' + fileNameChip[1];
        return ApiResult.ok(
            await this.fileService.uploadCos(filePath, fileName)
        );
    }

    //: 文件流输出待做
    // @Post('/file')
    // async getImage(imageName: string): Promise<Response> {
    // }
}
