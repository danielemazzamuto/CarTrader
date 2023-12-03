<template>
  <div class="shadow rounded overflow-hidden flex justify-between mb-4">
    <div class="flex">
      <img class="w-80 mr-3 h-44" :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`" alt="">
      <div class="p-3">
        <h1 class="text-2xl">{{ listing.name }}</h1>
        <p class="text-blue-400">${{ listing.price }}</p>
      </div>
    </div>
    <div class="p-3 flex">
      <NuxtLink class="text-blue-400 mr-5" :to="`/profile/listings/view/${listing.id}`">View</NuxtLink>
      <p @click="deleteClick(listing.id)" class="text-red-400 cursor-pointer">Delete</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  listing: Object
})
const config = useRuntimeConfig();

const emits = defineEmits(['handleDelete'])
const deleteClick = (listingId) => {
  emits('handleDelete', listingId)
}
</script>