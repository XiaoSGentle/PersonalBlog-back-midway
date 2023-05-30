import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { log } from 'console';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RelNoteClassify } from '../entity/RelNoteClassify';
import { AddOrUpdateNoteParam } from '../dto/note/AddOrUpdateNoteParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { FunNote } from '../entity/FunNote';
import { Pageparam } from '../util/Page/PageParam';
import { Pagination } from '../util/Page/Pagination';
import { getUUID } from '../util/UUID/UUID';

@Provide()
export class NoteService {
    @InjectEntityModel(FunNote)
    noteModel: Repository<FunNote>;
    @InjectEntityModel(RelNoteClassify)
    noteClassifyModel: Repository<RelNoteClassify>;

    // 按照规定
    async getNoteList(param: GetNoteParam) {
        log(param);
    }

    // 添加
    async addNote(creatorUuid: string) {
        const note = new FunNote();
        note.creatorUuid = creatorUuid;
        note.del = 0;
        note.createTime = new Date();
        note.updateTime = new Date();
        note.readNum = 0;
        note.starNum = 0;
        note.uuid = getUUID();
        return await this.noteModel.save(note);
    }
    // 修改
    async updateNote(param: AddOrUpdateNoteParam) {
        const note = new FunNote();
        const reInSql = await this.noteModel.findOne({
            where: { uuid: param.uuid },
        });
        Object.assign(note, reInSql);
        Object.assign(note, param);
        note.tags = param.tags.toString();
        note.updateTime = new Date();
        return await this.noteModel.save([note], { reload: false });
    }
    // 获取笔记
    async getAllNote(param: Pageparam) {
        const query: SelectQueryBuilder<FunNote> = this.noteModel
            .createQueryBuilder('note')
            .orderBy('create_time', 'ASC');
        const result = Pagination.findByPage(query, param);
        return result;
    }
    // 获取笔记分类列表
    async getAllNoteClassify() {
        return await this.noteClassifyModel.find();
    }
}
