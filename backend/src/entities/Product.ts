import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity, 
  ManyToOne 
} from "typeorm";
import { ObjectType, Field, Int, Float } from "type-graphql";
import { Category } from "./Category";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => Float)
  @Column("decimal")
  price!: number;

  @Field(() => Int)
  @Column("int")
  stock!: number;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.id, { nullable: true })
  category!: Category;
}
