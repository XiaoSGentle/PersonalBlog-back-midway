import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('sys_dict', { schema: 'personal_blog' })
export class SysDict extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'classify',
        comment: '分类',
        length: 255,
    })
    classify: string;

    @Column('varchar', {
        primary: true,
        name: 'key',
        comment: '分类',
        length: 255,
    })
    key: string;

    @Column('varchar', {
        primary: true,
        name: 'value',
        comment: '值',
        length: 255,
    })
    value: string;
}
