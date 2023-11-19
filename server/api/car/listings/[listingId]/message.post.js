import Joi from 'joi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// create schema for validation
const schema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required().min(5),
  message: Joi.string().min(20).required(),
  name: Joi.string().required(),
})

export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params;
  // Read the form data with readBody
  const body = await readBody(event);
  // Validate the data (we installed joi)
  const {error, value} = await schema.validate(body);

  if(error){
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    })
  }

   // Destructuring the body
   const {
    email,
    phone,
    message,
    name
  } = body;

   // Create message to store it to the db
   const mess = await prisma.message.create({
    data: {
    email,
    phone,
    message,
    listingId: +listingId,
    name
    }
  })

  return mess;
})