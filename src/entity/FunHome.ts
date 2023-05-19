import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../util/BaseEntity/BaseEntity';

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
        name: 'cid',
        nullable: true,
        comment: '子id',
        length: 255,
    })
    cid: string | null;

    @Column('varchar', {
        name: 'des',
        nullable: true,
        comment: '描述',
        length: 255,
    })
    des: string | null;

    @Column('int', { name: 'del', nullable: true, comment: '逻辑删除' })
    del: number | null;
}
