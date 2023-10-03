<template>
  <div>
      <CarDetailHero :car="car"/>

      <CarDetailAttributes :features="car.features"/>

      <CarDetailDescription :description="car.description"/>

      <CarDetailContact />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'custom',
})
const { cars } = useCars();
const { capitalizeFirstLetter } = useUtilities();

const { name, id } = useRoute().params;
useHead({
  title: `${capitalizeFirstLetter(name)}`
})

const car = computed(() => {
   const carFound = cars.find(c => c.id === +id)
   if (carFound) return carFound;
   throw createError({statusCode: '400', message: `The car with the ID of ${id} was not found!`})
})


</script>
