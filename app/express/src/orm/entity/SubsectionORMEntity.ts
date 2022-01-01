import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChapterORMEntity } from './ChapterORMEntity';
import { PartORMEntity } from './PartORMEntity';
import { SectionORMEntity } from './SectionORMEntity';

@Entity('subsections')
export class SubsectionORMEntity {
  @PrimaryColumn()
  num!: number; // 1以上の整数

  @PrimaryColumn()
  chapter_num!: number;

  @PrimaryColumn()
  part_num!: number;

  @PrimaryColumn()
  section_num!: number;

  @Column()
  title!: string;

  @ManyToOne(() => ChapterORMEntity)
  @JoinColumn({ name: 'chapter_num', referencedColumnName: 'num' })
  chapter!: ChapterORMEntity;

  @ManyToOne(() => PartORMEntity)
  @JoinColumn([
    { name: 'part_num', referencedColumnName: 'num' },
    { name: 'chapter_num', referencedColumnName: 'chapter_num' },
  ])
  part!: PartORMEntity;

  @ManyToOne(() => SectionORMEntity)
  @JoinColumn([
    { name: 'section_num', referencedColumnName: 'num'},
    { name: 'chapter_num', referencedColumnName: 'chapter_num' },
    { name: 'part_num', referencedColumnName: 'part_num' },
  ])
  section!: SectionORMEntity;
}
