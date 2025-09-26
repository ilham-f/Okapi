import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field(() => Product)
  @ManyToOne(() => Product)
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Field(() => Int)
  @Column()
  productId!: number;

  @Field(() => Int)
  @Column("int")
  quantity!: number;

  @Field(() => Int)
  @Column("int")
  total!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;
}
