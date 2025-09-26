import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { User } from "../../entities/User";
import { hashPassword, verifyPassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

@Resolver()
export class UserResolver {
  // Ambil semua user
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  // Ambil user by id
  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | null> {
    return await User.findOne({ where: { id } });
  }

  // Register user baru
  @Mutation(() => User)
  async register(
    @Arg("name") name: string,
    @Arg("role") role: string,
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashed = await hashPassword(password);
    const user = User.create({
      name,
      role,
      username,
      password: hashed,
    });
    await user.save();
    return user;
  }

  // Login user -> return JWT
  @Mutation(() => String)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<string> {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error("User not found");

    const valid = await verifyPassword(password, user.password);
    if (!valid) throw new Error("Invalid password");

    // return token JWT
    return generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  }
}
