import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const car = await prisma.car.findUnique({
    where: {
      id: +id,
    }
   });

  if(!car){
    throw createError({
      statusCode: 404,
      message: `The car with the ID of ${id} was not found!`
    })
  }

  return car;

})