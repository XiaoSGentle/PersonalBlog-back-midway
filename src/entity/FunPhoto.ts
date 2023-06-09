import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('fun_photo', { schema: 'personal_blog' })
export class FunPhoto extends BaseEntity {
    @PrimaryColumn()
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: '主键',
        length: 20,
    })
    uuid: string;

    @Column('text', { name: 'title', nullable: true, comment: '标题' })
    title: string | null;

    @Column('text', { name: 'des', nullable: true, comment: '描述' })
    des: string | null;

    @Column('varchar', { name: 'classify', nullable: true, comment: '分类' })
    classify: string | null;

    @Column('int', { name: 'is_show', nullable: true, comment: '是否展示' })
    isShow: number | null;

    @Column('varchar', {
        name: 'url',
        nullable: true,
        comment: '地址',
        length: 255,
    })
    url: string | null;
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
