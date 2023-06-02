/* eslint-disable no-empty */
import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UpdateNoteParam } from '../dto/note/UpdateNoteParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { FunNote } from '../entity/FunNote';
import { RelNoteClassify } from '../entity/RelNoteClassify';
import { Pagination } from '../util/Page/Pagination';
import { StringUtils } from '../util/String/StringUtil';
import { TimeUtil } from '../util/Time/TimeUtil';
import { getUUID } from '../util/UUID/UUID';
import { AddNoteParam } from '../dto/note/AddNoteParam';
import { Context } from '@midwayjs/koa';

@Provide()
export class NoteService {
    @InjectEntityModel(FunNote)
    noteModel: Repository<FunNote>;
    @InjectEntityModel(RelNoteClassify)
    noteClassifyModel: Repository<RelNoteClassify>;

    @Inject()
    ctx: Context;
    // 添加
    async addNote(param: AddNoteParam) {
        const note = this.createNewNote(param);
        return await this.noteModel.save(note);
    }
    // 修改
    async updateNote(param: UpdateNoteParam) {
        const note = new FunNote();
        const reInSql = await this.noteModel.findOne({
            where: { uuid: param.uuid },
        });
        Object.assign(note, reInSql);
        Object.assign(note, param);
        note.tags = param.tags.toString();
        note.updateTime = TimeUtil.GetNowTime();
        return await this.noteModel.save([note]);
    }
    // 获取笔记
    async getAllNote(param: GetNoteParam) {
        const query: SelectQueryBuilder<FunNote> =
            this.noteModel.createQueryBuilder();
        if (!StringUtils.isEmpty(param.classfiyUuids)) {
            query.andWhere('classification_uuid = :classificationUuids', {
                classificationUuids: param.classfiyUuids,
            });
        }
        if (!StringUtils.isEmpty(param.keyword)) {
            query
                .orWhere('title REGEXP :kewords', { kewords: param.keyword })
                .orWhere('tags REGEXP :kewords', { kewords: param.keyword })
                .orWhere('content REGEXP :kewords', { kewords: param.keyword });
        }
        if (!StringUtils.isEmpty(param.createUUid)) {
            query.andWhere('creator_uuid = :createUUid', {
                createUUid: param.createUUid,
            });
        }
        query.orderBy('create_time', 'DESC');
        const result = Pagination.findByPage(query, param);
        return result;
    }
    // 获取笔记分类列表
    async getAllNoteClassify() {
        return await this.noteClassifyModel.find();
    }
    createNewNote(param: AddNoteParam) {
        const note = new FunNote();
        Object.assign(note, param);
        note.content = '🖋️开始愉快的写文章吧';
        note.tags = param.tags.toString();
        note.creatorUuid = this.ctx.user.uuid;
        note.del = 0;
        note.createTime = TimeUtil.GetNowTime();
        note.updateTime = TimeUtil.GetNowTime();
        note.readNum = 0;
        note.starNum = 0;
        note.uuid = getUUID();
        return note;
    }
}
