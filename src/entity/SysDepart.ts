import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sys_depart', { schema: 'personal_blog' })
export class SysDepart extends BaseEntity {
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
        comment: '部门名称',
        length: 255,
    })
    name: string | null;

    @Column('varchar', {
        name: 'role',
        nullable: true,
        comment: '权限名称',
        length: 255,
    })
    role: string | null;
}
