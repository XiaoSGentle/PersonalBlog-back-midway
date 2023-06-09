import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { FunPhoto } from '../entity/FunPhoto';
@Provide()
export class PhotoService {
    @InjectEntityModel(FunPhoto)
    photoModel: Repository<FunPhoto>;
}
