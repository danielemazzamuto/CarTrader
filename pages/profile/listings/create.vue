<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Create a New Listing</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <CarAdSelect
        :options="makes"
        @change-input="onChangeInput"
        name="make"
        title="Make *"
      />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        :name="input.name"
        :placeholder="input.placeholder"
        :title="input.title"
        @change-input="onChangeInput"
      />
      <CarAdTextarea
        name="description"
        placeholder=""
        title="Description *"
        @change-input="onChangeInput" 
      />
      <CarAdImage @change-input="onChangeInput" />
      <div>
        <button @click="handleSubmit" :disabled="isButtonDisabled" class="bg-blue-400 text-white rounded py-2 px-7 mt-3">Submit</button>
        <p v-if="errorMessage" class="mt-3 text-red-400"> {{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'custom',
  middleware: ['auth'],
})

const { makes } = useCars();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const info = useState('adInfo', ()=>{
  return {
    make: '',
    model: '',
    year: '',
    miles: '',
    price: '',
    city: '',
    numberOfSeats: '',
    features: '',
    price: '',
    description: '',
    image: null
  }
})

const errorMessage = ref("");

const inputs = ref([
  {
    id: 1,
    title: 'Model *',
    name: 'model',
    placeholder: 'Civic'
  },
  {
    id: 2,
    title: 'Year *',
    name: 'year',
    placeholder: '2019'
  },
  {
    id: 3,
    title: 'Miles *',
    name: 'miles',
    placeholder: '10000'
  },
  {
    id: 4,
    title: 'City *',
    name: 'city',
    placeholder: 'Milan'
  },
  {
    id: 5,
    title: 'Number of Seats *',
    name: 'numberOfSeats',
    placeholder: '5'
  },
  {
    id: 6,
    title: 'Price *',
    name: 'price',
    placeholder: '25000'
  },
  {
    id: 7,
    title: 'Features *',
    name: 'features',
    placeholder: 'Leather Interior, No Accidents'
  },
])

const onChangeInput = (data, name)=>{
  info.value[name] = data;
}

const isButtonDisabled = computed(() => {
  for (const key in info.value) {
    if (!info.value[key]) return true;
    return false;
  }
})

const handleSubmit = async () => {
  const fileName = Math.floor(Math.random() * 1000000000000000000);
  const {data, error} = await supabase.storage.from("images").upload("public/" + fileName, info.value.image);
  if(error){
    return errorMessage.value = "Cannot upload image";
  }

  const body = {
    ...info.value,
    city: info.value.city.toLowerCase(),
    features: info.value.features.split(", "),
    numberOfSeats: +info.value.numberOfSeats,
    miles: +info.value.miles,
    price: +info.value.price,
    year: +info.value.year,
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path
  }

  try {
    const response = await $fetch("/api/car/listings", {
      method: "post",
      body
    })
    navigateTo("/profile/listings")
  } catch (err) {
    errorMessage.value = err.statusMessage;
    await supabase.storage.from("images").remove(data.path)
  }
}
</script>