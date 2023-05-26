import { Column, Entity } from 'typeorm';

@Entity('rel_note_classify', { schema: 'personal_blog' })
export class RelNoteClassify {
    @Column('varchar', {
        primary: true,
        name: 'uuid',
        comment: '分类uuid',
        length: 20,
    })
    uuid: string;

    @Column('varchar', {
        name: 'classify_name',
        comment: '分类名称',
        length: 255,
    })
    classifyName: string;

    @Column('int', { name: 'num', nullable: true, comment: '文章数量' })
    num: number | null;
}
