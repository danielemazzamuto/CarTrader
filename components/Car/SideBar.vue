<template>
  <div class="shadow border w-80 mr-10 z-30 h-[200px]">
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

    <!-- PRICE START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3 class="mr-2">Price</h3>
      <h3 @click="updateModal('price')" class="text-blue-400 capitalize">{{ priceRangeText }}</h3>
      <div class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white" v-if="modal.price">
        <input class="border p-1 rounded" type="number" placeholder="Min" v-model="priceRange.min">
        <input class="border p-1 rounded mt-2" type="number" placeholder="Max" v-model="priceRange.max">
        <p v-if="priceRange.error">Please, correct the input values.</p>
        <button @click="onChangePrice" class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button>
      </div>
    </div>
    <!-- PRICE END -->
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { makes } = useCars();

const modal = ref({
    location: false,
    make: false,
    price: false
})

const city = ref('');

const priceRange = ref({
  min: '',
  max: '',
  error: false
})

const priceRangeText = computed(()=>{
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;
  if(!minPrice && !maxPrice) return 'Any';
  else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `> $${minPrice}`
  } else {
    return `$${minPrice} - $${maxPrice}`
  }
})

const make = computed(()=>{
  return route.params.make ? route.params.make : 'Any'
})

const onChangePrice = () => {
  priceRange.value.error = false;
  if(priceRange.value.min && priceRange.value.max){
    if(priceRange.value.min > priceRange.value.max){
      priceRange.value.error = true;
      return;
    };
  }
  updateModal('price')
  priceRange.value.error = false;
  router.push({
    query:{
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max,
    }
  })
}

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
