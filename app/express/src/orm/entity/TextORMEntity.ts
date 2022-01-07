import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ChapterORMEntity } from './ChapterORMEntity';
import { PartORMEntity } from './PartORMEntity';
import { SectionORMEntity } from './SectionORMEntity';
import { SubsectionORMEntity } from './SubsectionORMEntity';
import { TopicORMEntity } from './TopicORMEntity';
import { ProductORMEntity } from './ProductORMEntity';

@Entity('texts')
export class TextORMEntity {
  @PrimaryColumn()
  chapter_num!: number;

  @Column()
  part_num!: number;

  @Column()
  section_num!: number;

  @Column()
  subsection_num!: number;

  @Column()
  topic_char!: string;

  @PrimaryColumn()
  line!: number;

  @PrimaryColumn()
  num!: number;

  @Column()
  body!: string;

  @Column()
  product_id!: number;

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

  @ManyToOne(() => TopicORMEntity)
  @JoinColumn([
    { name: 'topic_char', referencedColumnName: 'char'},
    { name: 'chapter_num', referencedColumnName: 'chapter_num' },
    { name: 'part_num', referencedColumnName: 'part_num' },
    { name: 'section_num', referencedColumnName: 'section_num' },
    { name: 'subsection_num', referencedColumnName: 'subsection_num' },
  ])
  topic!: TopicORMEntity;

  @ManyToOne(() => ProductORMEntity)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product!: TopicORMEntity;
}
