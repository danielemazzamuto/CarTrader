<template>
  <div>
    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-6xl">My Listings</h1>
      <NuxtLink to="/profile/listings/create" class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer">+</NuxtLink>
    </div>
    <div class="shadow rounded p-3 mt-5">
      <CarListingCard
      v-for="listing in listings"
      :key="listing.id"
      :listing="listing"
      @handle-delete="deleteListing"
      /> 
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'custom',
  middleware: ['auth']
})

// get data listings
const user = useSupabaseUser();
const {data: listings, refresh} = await useFetch(`/api/car/listings/user/${user.value.id}`);

// delete listing
const deleteListing = async (listingId) => {
  await useFetch(`/api/car/listings/${listingId}`, {
    method: 'DELETE'
  });
  listings.value = listings.value.filter(listing => listing.id !== listingId)
}
</script>

<style scoped>

</style>