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

const route = useRoute();
const {data: car} = await useFetchCar(route.params.id);

const { capitalizeFirstLetter } = useUtilities();
useHead({
  title: `${capitalizeFirstLetter(route.params.name)}`
})



</script>
