import cars from '@/data/cars.json'

// create server endpoint for the http request
export default defineEventHandler((event) => {
  // get url param
  const { city } = event.context.params;
  // get additional url queries
  const { make, minPrice, maxPrice } = getQuery(event);

  let filteredCars = cars.filter(car => car.city.toLowerCase() === city.toLowerCase());

  if(make){
     filteredCars = filteredCars.filter(car => car.make.toLocaleLowerCase() === make.toLowerCase())
  }

  if (minPrice && maxPrice) {
     filteredCars = filteredCars.filter(car => car.price >= parseInt(minPrice) && car.price <= parseInt(maxPrice))
  } else if (minPrice && !maxPrice){
     filteredCars = filteredCars.filter(car => car.price >= parseInt(minPrice))
  } else if (!minPrice && maxPrice){
     filteredCars = filteredCars.filter(car => car.price <= parseInt(maxPrice))
  }
  return filteredCars
})