// src/seeds/seed.ts
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Transaction } from "../entities/Transaction";
import { Report } from "../entities/Report";
import { IsNull, Not } from "typeorm";

async function seed() {
  try {
    // Connect ke database
    await AppDataSource.initialize();

    // Bersihkan data lama (opsional, kalau mau reset)
    await Transaction.delete({ id: Not(IsNull()) });
    await Report.delete({ id: Not(IsNull()) });
    await User.delete({ id: Not(IsNull()) });
    await Product.delete({ id: Not(IsNull()) });

    // Insert beberapa user
    const users = await User.save([
      {
        name: "Admin",
        role: "admin",
        username: "admin",
        password: "123",
      },
      {
        name: "Ilham",
        role: "customer",
        username: "ilham",
        password: "123",
      },
    ]);

    // Insert beberapa product
    const products = await Product.save([
      {
        name: "Kapal Api Spesial",
        stock: 20,
        price: 5000,
      },
      {
        name: "Aqua Galon",
        stock: 15,
        price: 20000,
      },
      {
        name: "Gas LPG",
        stock: 10,
        price: 20000,
      },
    ]);

    // Insert contoh transaksi
    const transactions = await Transaction.save([
      {
        userId: users[1].id, // Ilham beli
        productId: products[0].id, // Kopi
        quantity: 2,
        total: 2 * products[0].price,
      },
      {
        userId: users[1].id,
        productId: products[1].id, // Aqua
        quantity: 1,
        total: products[1].price,
      },
    ]);

    // Insert contoh laporan (misalnya harian)
    await Report.save({
      period: "2025-09-20",
      totalSales: transactions.reduce((sum, t) => sum + t.total, 0),
      totalTransactions: transactions.length,
    });

    console.log("✅ Seeding selesai!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
}

seed();
