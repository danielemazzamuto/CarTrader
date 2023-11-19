import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler((event => {
  const { listingId } = event.context.params;
  // Fetch data from db
  return prisma.message.findMany({
    where: {
      listingId: +listingId,
    },
  })
}))