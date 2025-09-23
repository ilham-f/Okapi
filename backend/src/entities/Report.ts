// src/entities/Report.ts
import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Report extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  period!: string; // contoh: "2025-09-20" (harian) atau "2025-09" (bulanan)

  @Field(() => Int)
  @Column("int", { default: 0 })
  totalSales!: number;

  @Field(() => Int)
  @Column("int", { default: 0 })
  totalTransactions!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;
}
