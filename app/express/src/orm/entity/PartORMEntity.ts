import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, } from 'typeorm';
import { ChapterORMEntity } from './ChapterORMEntity';

@Entity('parts')
export class PartORMEntity {
  @PrimaryColumn()
  num!: number; // 1以上の整数

  @PrimaryColumn()
  chapter_num!: number;

  @Column()
  title!: string;

  @ManyToOne(() => ChapterORMEntity, (chapter) => chapter.num)
  @JoinColumn({ name: 'chapter_num' })
  chapter!: ChapterORMEntity;
}
