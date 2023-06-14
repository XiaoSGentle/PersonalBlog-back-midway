import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('fun_home', { schema: 'personal_blog' })
export class FunHome extends BaseEntity {
    @PrimaryColumn()
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: '主键',
        length: 20,
    })
    uuid: string;

    @Column('varchar', {
        name: 'pos',
        nullable: true,
        comment: '位置',
        length: 255,
    })
    pos: string | null;

    @Column('varchar', {
        name: 'content',
        nullable: true,
        comment: '名言内容',
        length: 255,
    })
    content: string | null;

    @Column('varchar', {
        name: 'author',
        nullable: true,
        comment: '作者',
        length: 255,
    })
    author: string | null;

    @Column('varchar', {
        name: 'des',
        nullable: true,
        comment: '描述',
        length: 500,
    })
    des: string | null;

    @Column('int', { name: 'del', nullable: true, comment: '逻辑删除' })
    del: number | null;

    @CreateDateColumn({})
    @Column({
        name: 'create_time',
        nullable: true,
        comment: '创建时间',
    })
    createTime: string | null;

    @UpdateDateColumn({})
    @Column({
        name: 'update_time',
        nullable: true,
        comment: '最后更新时间',
    })
    updateTime: string | null;
}
