import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @Column('varchar', {
        name: 'classification_uuid',
        nullable: true,
        comment: '分类uuid',
        length: 20,
    })
    classificationUuid: string | null;

    @Column('text', { name: 'tags', nullable: true, comment: '标签' })
    tags: string | null;

    @Column('text', { name: 'title', nullable: true, comment: '标题' })
    title: string | null;

    @Column('int', { name: 'is_show', nullable: true, comment: '是否展示' })
    isShow: string | null;

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

    @CreateDateColumn({
        type: 'timestamp',
    })
    @Column('datetime', {
        name: 'create_time',
        nullable: true,
        comment: '创建时间',
    })
    createTime: string | null;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    @Column('datetime', {
        name: 'update_time',
        nullable: true,
        comment: '最后更新时间',
    })
    updateTime: string | null;
}
