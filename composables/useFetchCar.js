export default async (id) => {
  
    const { data, error } = await useFetch(`/api/car/${id}`)
  
    if(error.value){
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: `Car with ID of ${id} does not exist`,
    })
    }
  
    return {data}
}