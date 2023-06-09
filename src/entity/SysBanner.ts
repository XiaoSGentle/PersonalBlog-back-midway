import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sys_banner', { schema: 'personal_blog' })
export class SysBanner extends BaseEntity {
    @PrimaryColumn()
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: '主键',
        length: 20,
    })
    uuid: string;

    @Column('varchar', {
        name: 'classify',
        nullable: true,
        comment: '分类名',
        length: 255,
    })
    classify: string | null;

    @Column('varchar', {
        name: 'title',
        nullable: true,
        comment: '标题',
        length: 255,
    })
    title: string | null;

    @Column('varchar', {
        name: 'icon',
        nullable: true,
        comment: '图标',
        length: 255,
    })
    icon: string | null;

    @Column('varchar', {
        name: 'back_img',
        nullable: true,
        comment: '背景图',
        length: 255,
    })
    backImg: string | null;

    @Column('int', { name: 'height', nullable: true, comment: '高度' })
    height: number | null;

    @Column('longtext', { name: 'content', nullable: true, comment: '内容' })
    content: string | null;
}
