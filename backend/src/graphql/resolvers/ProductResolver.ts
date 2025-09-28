import { Resolver, Query } from "type-graphql";
import { Product } from "../../entities/Product";
import { AppDataSource } from "../../config/data-source";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return AppDataSource.getRepository(Product).find({
      relations: ["category"], // ambil data relasi kategori
    });
  }
}
