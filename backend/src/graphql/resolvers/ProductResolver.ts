import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Product } from "../../entities/Product";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    return Product.find();
  }

  @Mutation(() => Product)
  async addProduct(
    @Arg("name") name: string,
    @Arg("price", () => Int) price: number,
    @Arg("stock", () => Int) stock: number
  ) {
    const product = Product.create({ name, price, stock });
    return product.save();
  }

  @Mutation(() => Product)
  async sellProduct(
    @Arg("id", () => Int) id: number,
    @Arg("quantity", () => Int) quantity: number
  ) {
    const product = await Product.findOneBy({ id });
    if (!product) throw new Error("Product not found");
    product.stock -= quantity;
    await product.save();
    return product;
  }
}
