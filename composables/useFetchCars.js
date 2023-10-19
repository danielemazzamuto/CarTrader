export default async (city, filters) => {
  try {
    const { data } = await useFetch(`/api/cars/${city}`, {
      params: {
        ...filters,
      }
    })
    console.log(data);
    return data;
  } catch (error) {
    throw createError({
      ...error.value,
      statusMessage: 'Unable to fetch cars',
    })
  }
}