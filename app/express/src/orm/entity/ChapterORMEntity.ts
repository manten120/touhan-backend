import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('chapters')
export class ChapterORMEntity {
  @PrimaryColumn()
  num!: number;

  @Column()
  title!: string;
}
