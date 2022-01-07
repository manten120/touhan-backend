import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChapterORMEntity } from './ChapterORMEntity';
import { PartORMEntity } from './PartORMEntity';
import { SectionORMEntity } from './SectionORMEntity';
import { SubsectionORMEntity } from './SubsectionORMEntity';

@Entity('topics')
export class TopicORMEntity {
  @PrimaryColumn()
  char!: string; // アルファベット1文字。a,b,c,....

  @PrimaryColumn()
  chapter_num!: number;

  @PrimaryColumn()
  part_num!: number;

  @PrimaryColumn()
  section_num!: number;

  @PrimaryColumn()
  subsection_num!: number;

  @Column({ nullable: true, type: 'varchar' })
  title!: string | null;

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
    { name: 'section_num', referencedColumnName: 'num' },
    { name: 'chapter_num', referencedColumnName: 'chapter_num' },
    { name: 'part_num', referencedColumnName: 'part_num' },
  ])
  section!: SectionORMEntity;

  @ManyToOne(() => SubsectionORMEntity)
  @JoinColumn([
    { name: 'subsection_num', referencedColumnName: 'num' },
    { name: 'chapter_num', referencedColumnName: 'chapter_num' },
    { name: 'part_num', referencedColumnName: 'part_num' },
    { name: 'section_num', referencedColumnName: 'section_num' },
  ])
  subsection!: SubsectionORMEntity;
}
