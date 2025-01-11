import {
  PrismaClient,
  Role,
  OrderStatus,
  PaymentStatus,
  ActionTaken,
} from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Bersihkan database terlebih dahulu (opsional)
  await prisma.report.deleteMany();
  await prisma.review.deleteMany();
  await prisma.order.deleteMany();
  await prisma.providerCategories.deleteMany();
  await prisma.service.deleteMany();
  await prisma.category.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = async (password) => await hash(password, 10);
  const userPass = await hashedPassword('user');
  const jasaPass = await hashedPassword('jasa');
  const adminPass = await hashedPassword('admin');

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'user',
      email: 'user@example.com',
      password: userPass,
      phone_number: 628123456789,
      address: 'Jl. Contoh No. 123',
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: jasaPass,
      phone_number: 628987654321,
      address: 'Jl. Contoh No. 123',
      role: Role.ADMIN,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'jasa',
      email: 'jasa@example.com',
      password: adminPass,
      phone_number: 628567891234,
      address: 'Jl. Contoh No. 123',
      role: Role.PROVIDER,
    },
  });

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Cleaning Service',
      description: 'Professional cleaning services for homes and offices',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Home Repair',
      description: 'Various home repair and maintenance services',
    },
  });

  // Create Provider
  const provider1 = await prisma.provider.create({
    data: {
      user_id: user3.id,
      provider_name: 'Joko',
      bio: 'Professional cleaning service with 5 years of experience',
      rating: 4.5,
      total_reviews: 100,
      Categories: {
        connect: [{ id: category1.id }], // Hubungkan dengan kategori
      },
    },
  });

  // Create ProviderCategories
  await prisma.providerCategories.create({
    data: {
      provider_id: provider1.id,
      category_id: category1.id,
    },
  });

  // Create Services
  const service1 = await prisma.service.create({
    data: {
      provider_id: provider1.id,
      title: 'Deep House Cleaning',
      description:
        'Complete house cleaning service including all rooms and bathrooms',
      price: 500000,
    },
  });

  // Create Order
  const order1 = await prisma.order.create({
    data: {
      user_id: user1.id,
      service_id: service1.id,
      provider_id: provider1.id,
      details: 'Need cleaning service for 3 bedroom house',
      location: 'Jl. Contoh No. 123',
      status: OrderStatus.PENDING,
      order_date: new Date(),
      total_price: 500000,
      payment_status: PaymentStatus.PENDING,
    },
  });

  // Create Review
  await prisma.review.create({
    data: {
      user_id: user1.id,
      provider_id: provider1.id,
      rating: 5,
      comment: 'Excellent service, very professional and thorough!',
    },
  });

  // Create Report
  await prisma.report.create({
    data: {
      reported_by_id: user1.id,
      reported_provider_id: provider1.id,
      description: 'Provider was late for appointment',
      action_taken: ActionTaken.PENDING,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
