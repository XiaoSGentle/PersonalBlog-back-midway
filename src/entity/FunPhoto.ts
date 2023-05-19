import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../util/BaseEntity/BaseEntity';

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

    @Column('varchar', {
        name: 'url',
        nullable: true,
        comment: '地址',
        length: 255,
    })
    url: string | null;
}
