import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// create server endpoint for the http request
export default defineEventHandler((event) => {
  // get url param
  const { city } = event.context.params;
  // get additional url queries
  const { make, minPrice, maxPrice } = getQuery(event);

  const filters = {
   city: city.toLowerCase(),
  }

  if(make){
     filters.make = make;
  }

  if(minPrice || maxPrice){
   filters.price = {};
  }

  if (minPrice) {
     filters.price.gte = +minPrice;
  }
  if (maxPrice){
   filters.price.lte = +maxPrice;
  }

  return prisma.car.findMany({
   where: filters,
  })
})