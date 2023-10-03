<template>
  <div class="flex h-screen justify-center items-center flex-col">
    <h1 class="text-9xl">{{ error.statusCode }}</h1>
    <p class="mt-7 text-4xl">{{ error.message }}</p>
    <button @click="handleClick" class="rounded mt-7 text-2xl bg-blue-400 px-7 py-4 text-white">Go back</button>
  </div>
</template>

<script setup>
//Nuxt built in error handling
const error = useError();

const handleClick = ()=>{
  clearError({
    redirect: '/'
  })
}
</script>