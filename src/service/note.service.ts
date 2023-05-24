import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';
import { CreateNoteParam } from '../dto/note/CreateNoteParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { FunNote } from '../entity/FunNote';

@Provide()
export class NoteService {
    @InjectEntityModel(FunNote)
    noteModel: Repository<FunNote>;

    // 按照规定
    async getNoteList(param: GetNoteParam) {
        log(param);
    }

    // 添加或者修改
    async addOrUpdateNote(param: CreateNoteParam) {
        log(param);
    }
}
