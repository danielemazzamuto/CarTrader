import Joi from 'joi'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// create schema for validation
const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().min(1999).max(new Date().getFullYear() + 1),
  miles: Joi.number().required().min(0),
  city: Joi.string().min(2).required(),
  numberOfSeats: Joi.number().min(1).max(10).required(),
  description: Joi.string().min(20).required(),
  features: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  listerId: Joi.string().required(),
  price: Joi.number().min(0).required(),
  name: Joi.string().required(),
})

export default defineEventHandler(async (event) => {
  // Read the form data with readBody
  const body = await readBody(event);
  // Validate the data (we installed joi)
  const {error, value} = await schema.validate(body)

  if (error){
    throw createError({
      statusCode: 412,
      statusMessage: error.message
    })
  }

  // Destructuring the body
  const {
    make,
    model,
    miles,
    city,
    numberOfSeats,
    description,
    features,
    image,
    listerId,
    price,
    name,
  } = body;

  // Create car to store it to the db
  const car = await prisma.car.create({
    data: {
      make,
      model,
      miles,
      city: city.toLowerCase(),
      numberOfSeats,
      description,
      features,
      image,
      listerId,
      price,
      name,
    }
  })

  return car;
})