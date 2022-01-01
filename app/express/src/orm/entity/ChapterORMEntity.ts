import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('chapters')
export class ChapterORMEntity {
  @PrimaryColumn()
  num!: number; // 1~5の整数

  @Column()
  title!: string;
}