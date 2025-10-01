import { Resolver, Query } from "type-graphql";
import { Category } from "../../entities/Category";
import { AppDataSource } from "../../config/data-source";

@Resolver()
export class CategoryResolver {
  private categoryRepo = AppDataSource.getTreeRepository(Category);

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.categoryRepo.findTrees({ relations: ["products"] }); 
  }
}
