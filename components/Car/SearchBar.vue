<template>
  <div
    class="font-serif text-2xl w-100 rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto"
  >
    <input
      class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none"
      placeholder="Search by city..."
      type="text"
      v-model="city"
    />
    <button
    @click="handleSearch"
    class="bg-sky-500 px-10 text-white"
    >Search</button>
</div>
<p v-if="inputError" class="text-white text-2xl mt-5">Please, type a city!</p>
</template>

<script setup>
// const router = useRouter();

const city = ref("");

const inputError = ref(false);

const handleSearch = () => {
    if(!city.value) return inputError.value = true;
    // router.push(`/city/${city.value}/car`);
    navigateTo(`/city/${city.value}/car`);
}
</script>
