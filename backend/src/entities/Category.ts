import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  Tree, 
  TreeChildren, 
  TreeParent, 
  TreeLevelColumn, 
  BaseEntity, 
  OneToMany
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Product } from "./Product";

@ObjectType()
@Entity()
@Tree("closure-table")
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @TreeLevelColumn()
  @Column({ default: 0 })
  level!: number;

  @Field(() => Category, { nullable: true })
  @TreeParent()
  parent!: Category | null;

  @Field(() => [Category])
  @TreeChildren()
  children!: Category[];

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
