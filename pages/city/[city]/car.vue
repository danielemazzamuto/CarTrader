<template>
  <div>
      <div class="mt-32 flex">
        <NuxtErrorBoundary>
          <CarSideBar />
          <NuxtPage />
          <!-- Catching the error with NuxtErrorBoundary -->
          <template #error="{ error }">
            <div class="text-center mx-auto flex flex-col">
              <h1 class="text-5xl text-red-600 mb-4">
                Sorry, something went wrong
              </h1>
              <code>{{ error }}</code>
              <button @click="error.value = null" class="text-white bg-blue-400 px-10 py-3 rounded mt-4">Go Back</button>
            </div>
          </template>
        </NuxtErrorBoundary>
      </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'custom',
})

const { capitalizeFirstLetter } = useUtilities();


const { city } = useRoute().params;
useHead({
  title: `Cars in ${capitalizeFirstLetter(city)}`
})

</script>
