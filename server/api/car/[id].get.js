import cars from '@/data/cars.json'

export default defineEventHandler((event) => {
  const { id } = event.context.params;
  const car = cars.find(c => c.id === +id);

  if(!car){
    throw createError({
      statusCode: 404,
      message: `The car with the ID of ${id} was not found!`
    })
  }

  return car;
})