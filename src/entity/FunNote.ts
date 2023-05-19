import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../util/BaseEntity/BaseEntity';

@Entity('fun_note', { schema: 'personal_blog' })
export class FunNote extends BaseEntity {
    @PrimaryColumn()
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: '主键',
        length: 20,
    })
    uuid: string;

    @Column('varchar', {
        name: 'creator_uuid',
        nullable: true,
        comment: '创建者uid',
        length: 20,
    })
    creatorUuid: string | null;

    @Column('int', { name: 'pid', nullable: true, comment: '父id' })
    pid: number | null;

    @Column('text', { name: 'title', nullable: true, comment: '标题' })
    title: string | null;

    @Column('varchar', {
        name: 'banner',
        nullable: true,
        comment: '预览图',
        length: 255,
    })
    banner: string | null;

    @Column('longtext', {
        name: 'content',
        nullable: true,
        comment: '笔记内容',
    })
    content: string | null;

    @Column('int', { name: 'read_num', nullable: true, comment: '阅读次数' })
    readNum: number | null;

    @Column('int', { name: 'star_num', nullable: true, comment: '星星数量' })
    starNum: number | null;

    @Column('int', { name: 'del', nullable: true, comment: '逻辑删除' })
    del: number | null;
}
