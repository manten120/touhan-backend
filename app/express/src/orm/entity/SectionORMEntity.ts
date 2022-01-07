import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChapterORMEntity } from './ChapterORMEntity';
import { PartORMEntity } from './PartORMEntity';

@Entity('sections')
export class SectionORMEntity {
  @PrimaryColumn()
  num!: number; // 0以上の整数 0ならセクション無し

  @PrimaryColumn()
  chapter_num!: number;

  @PrimaryColumn()
  part_num!: number;

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
}
