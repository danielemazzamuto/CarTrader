<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
    <!-- LOCATION START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3
        @click="updateModal('location')"
        class="text-blue-400 capitalize ml-2"
      >
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input
          v-model="city"
          type="text"
          class="border p-1 rounded"
        />
        <button
            @click="onChangeLocation"
            class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        >          Apply
        </button>
      </div>
    </div>
    <!-- LOCATION END -->

    <!-- MAKE START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 @click="updateModal('make')" class="text-blue-400 capitalize">{{ make }}</h3>
    <div v-if="modal.make" class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white">      
      <h4
        v-for="make in makes"
        :key="make"
        @click="onChangeMake(make)"
        class="w-1/3">{{
        make
        }}</h4
      >
    </div>
    </div>
    <!-- MAKE END -->

    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize"></h3>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { makes } = useCars();

const modal = ref({
    location: false,
    make: false,
    price: false
})

const city = ref('');

const make = computed(()=>{
  return route.params.make ? route.params.make : 'Any'
})

const updateModal = (key) => {
    modal.value[key] = !modal.value[key];
}

const onChangeLocation = () => {
    if(!city.value) return;
    if(!isNaN(parseInt(city.value))){
        throw createError({
            statusCode: 400,
            message: 'Invalid city format'
        })
    }
    updateModal('location');
    navigateTo(`/city/${city.value}/car/${route.params.make}`)
    city.value = '';
}

const onChangeMake = (make) => {
  updateModal('make')
  navigateTo(`/city/${route.params.city}/car/${make}`)
}
</script>
