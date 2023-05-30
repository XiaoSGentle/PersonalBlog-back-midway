import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('fun_message', { schema: 'personal_blog' })
export class FunMessage extends BaseEntity {
    @PrimaryColumn()
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: '主键',
        length: 20,
    })
    uuid: string;

    @Column('varchar', {
        name: 'name',
        nullable: true,
        comment: '用户名',
        length: 255,
    })
    name: string | null;

    @Column('varchar', {
        name: 'avatar',
        nullable: true,
        comment: '头像',
        length: 255,
    })
    avatar: string | null;

    @Column('varchar', {
        name: 'is_visitor',
        nullable: true,
        comment: '匿名',
        length: 255,
    })
    isVisitor: number | null;

    @Column('varchar', {
        name: 'content',
        nullable: true,
        comment: '评论内容',
        length: 255,
    })
    content: string | null;

    @Column('varchar', {
        name: 'system',
        nullable: true,
        comment: '系统',
        length: 255,
    })
    system: string | null;

    @Column('varchar', {
        name: 'ip',
        nullable: true,
        comment: 'IP地址',
        length: 255,
    })
    ip: string | null;

    @Column('varchar', {
        name: 'browser',
        nullable: true,
        comment: '浏览器类型',
        length: 255,
    })
    browser: string | null;

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
    createTime: Date | null;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    @Column('datetime', {
        name: 'update_time',
        nullable: true,
        comment: '最后更新时间',
    })
    updateTime: Date | null;
}
