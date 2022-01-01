import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export class ProductORMEntity {
  @PrimaryColumn()
  id?: number; // 関連商品なしは0

  @Column()
  name!: string;
}