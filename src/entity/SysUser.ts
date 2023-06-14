import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('sys_user', { schema: 'personal_blog' })
export class SysUser extends BaseEntity {
    @PrimaryColumn()
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: 'uuid',
        length: 20,
    })
    uuid: string;

    @Column('varchar', {
        name: 'username',
        nullable: true,
        comment: '用户名',
        length: 255,
    })
    username: string | null;

    @Column('varchar', {
        name: 'password',
        nullable: true,
        comment: '密码',
        length: 255,
    })
    password: string | null;

    @Column('varchar', {
        name: 'nickname',
        nullable: true,
        comment: '昵称',
        length: 255,
    })
    nickname: string | null;

    @Column('varchar', {
        name: 'avatar',
        nullable: true,
        comment: '头像',
        length: 255,
    })
    avatar: string | null;

    @Column('int', { name: 'sex', nullable: true, comment: '性别' })
    sex: number | null;

    @Column('varchar', {
        name: 'constellation',
        nullable: true,
        comment: '星座',
        length: 255,
    })
    constellation: string | null;

    @Column('date', {
        name: 'birthday',
        nullable: true,
        comment: '出生日期',
    })
    birthday: string | null;

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
