import { Config, Inject, Provide } from '@midwayjs/core';
import { COSService } from '@midwayjs/cos';
import { InfoService } from '@midwayjs/info';

@Provide()
export class FileService {
    @Inject()
    cosService: COSService;

    @Inject()
    inforService: InfoService;

    @Config('userconfig')
    userConfig: any;
    /**
     *  上传文件至cos
     * @param filePath 本地文件地址
     * @param fileName 本地文件名称
     * @returns 公网访问地址
     */
    async uploadCos(filePath: string, fileName: string): Promise<string> {
        const upCosResult = await this.cosService.sliceUploadFile({
            Bucket: this.userConfig.cos.Bucket,
            Region: this.userConfig.cos.Region,
            Key: fileName,
            FilePath: filePath,
        });
        return 'https://' + upCosResult.Location;
    }
}
