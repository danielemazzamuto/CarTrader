import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const { userId } = event.context.params;

  // Fetch data from db
  return prisma.car.findMany({
    where: {
      listerId: userId
    },
    select: {
      image: true,
      id: true,
      name: true,
      price: true
    }
  })
})