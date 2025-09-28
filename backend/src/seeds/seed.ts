import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Transaction } from "../entities/Transaction";
import { Report } from "../entities/Report";
import { Category } from "../entities/Category";
import { IsNull, Not } from "typeorm";
import * as bcrypt from "bcrypt";

async function seed() {
  try {
    await AppDataSource.initialize();

    // Bersihkan data lama
    await Transaction.delete({ id: Not(IsNull()) });
    await Report.delete({ id: Not(IsNull()) });
    await Product.delete({ id: Not(IsNull()) });
    await User.delete({ id: Not(IsNull()) });
    await Category.delete({ id: Not(IsNull()) });

    // Hash password
    const hashPassword = async (plain: string) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(plain, salt);
    };

    // Insert users
    const users = await User.save([
      {
        name: "Admin",
        role: "admin",
        username: "admin",
        password: await hashPassword("123"),
      },
      {
        name: "Ilham",
        role: "customer",
        username: "ilham",
        password: await hashPassword("123"),
      },
      {
        name: "Budi",
        role: "customer",
        username: "budi",
        password: await hashPassword("123"),
      },
      {
        name: "Sinta",
        role: "customer",
        username: "sinta",
        password: await hashPassword("123"),
      },
    ]);

    // Insert kategori (tree)
    const makanan = Category.create({ name: "Makanan" });
    const minuman = Category.create({ name: "Minuman" });
    const rumahTangga = Category.create({ name: "Kebutuhan Rumah Tangga" });

    await Category.save([makanan, minuman, rumahTangga]);

    // Sub kategori makanan
    const mie = Category.create({ name: "Mie Instan", parent: makanan });
    const lauk = Category.create({ name: "Lauk", parent: makanan });

    // Sub kategori minuman
    const kopi = Category.create({ name: "Kopi", parent: minuman });
    const air = Category.create({ name: "Air Mineral", parent: minuman });

    await Category.save([mie, lauk, kopi, air]);

    // Insert produk dengan kategori
    const products = await Product.save([
      { name: "Indomie Goreng", stock: 50, price: 3000, category: mie },
      { name: "Telur Ayam 1 Kg", stock: 30, price: 25000, category: lauk },
      { name: "Kapal Api Spesial", stock: 20, price: 5000, category: kopi },
      { name: "Aqua Galon", stock: 15, price: 20000, category: air },
      { name: "Gas LPG 3kg", stock: 10, price: 20000, category: rumahTangga },
      { name: "Minyak Goreng 1L", stock: 25, price: 15000, category: rumahTangga },
    ]);

    // Insert transaksi
    const transactions = await Transaction.save([
      {
        userId: users[1].id, // Ilham
        productId: products[2].id, // Kopi
        quantity: 2,
        total: 2 * products[2].price,
      },
      {
        userId: users[1].id,
        productId: products[3].id, // Aqua
        quantity: 1,
        total: products[3].price,
      },
      {
        userId: users[2].id, // Budi
        productId: products[0].id, // Indomie
        quantity: 5,
        total: 5 * products[0].price,
      },
      {
        userId: users[3].id, // Sinta
        productId: products[1].id, // Telur
        quantity: 2,
        total: 2 * products[1].price,
      },
      {
        userId: users[3].id,
        productId: products[5].id, // Minyak
        quantity: 1,
        total: products[5].price,
      },
    ]);

    // Insert laporan
    await Report.save([
      {
        period: "2025-09-20",
        totalSales: transactions.slice(0, 2).reduce((sum, t) => sum + t.total, 0),
        totalTransactions: 2,
      },
      {
        period: "2025-09-21",
        totalSales: transactions.slice(2).reduce((sum, t) => sum + t.total, 0),
        totalTransactions: 3,
      },
      {
        period: "2025-09",
        totalSales: transactions.reduce((sum, t) => sum + t.total, 0),
        totalTransactions: transactions.length,
      },
    ]);

    console.log("✅ Seeding selesai");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
}

seed();
