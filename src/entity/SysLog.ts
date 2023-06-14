import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('sys_log', { schema: 'personal_blog' })
export class SysLog {
    @PrimaryColumn()
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: '主键',
        length: 20,
    })
    uuid: string;

    @Column('varchar', {
        name: 'ip',
        nullable: true,
        comment: '地址',
        length: 255,
    })
    ip: string | null;

    @Column('varchar', {
        name: 'browser',
        nullable: true,
        comment: '浏览器',
        length: 255,
    })
    browser: string | null;

    @CreateDateColumn({})
    @Column({ name: 'create_time' })
    creatTime: string | null;

    @Column('varchar', {
        name: 'system',
        nullable: true,
        comment: '系统',
        length: 255,
    })
    system: string | null;

    @Column('varchar', {
        name: 'port',
        nullable: true,
        comment: '访问的接口',
        length: 255,
    })
    port: string | null;
    @Column('varchar', {
        name: 'user_id',
        nullable: true,
        comment: '用户id',
        length: 255,
    })
    userId: string | null;

    @Column('varchar', {
        name: 'method',
        nullable: true,
        comment: '访问的方法',
        length: 255,
    })
    method: string | null;

    @Column('longtext', {
        name: 'data',
        nullable: true,
        comment: '访问的方法',
    })
    data: any | null;
}
