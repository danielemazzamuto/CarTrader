<template>
  <div>
      <CarCards v-if="cars.length" :cars="cars"/>
      <h1 v-else class="text-red-600">No Cars with current filters</h1>
  </div>
</template>

<script setup>
const route = useRoute()
const maxPrice = computed(() => route.query.maxPrice)
const minPrice = computed(() => route.query.minPrice)
const { data:cars, refresh } = await useFetchCars(route.params.city, {
 minPrice,
 maxPrice,
 make: route.params.make
});
watch(() => route.query, () => refresh());
</script>
