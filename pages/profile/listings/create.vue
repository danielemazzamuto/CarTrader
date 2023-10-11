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
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'custom'
})

const { makes } = useCars();

const info = useState('adInfo', ()=>{
  return {
    make: '',
    model: '',
    year: '',
    miles: '',
    price: '',
    city: '',
    seats: '',
    features: '',
    description: '',
    image: null
  }
})

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
    name: 'seats',
    placeholder: '5'
  },
  {
    id: 6,
    title: 'Features *',
    name: 'features',
    placeholder: 'Leather Interior, No Accidents'
  },
])

const onChangeInput = (data, name)=>{
  info.value[name] = data;
}
</script>