<template>
  <div class="flex flex-col w-[48%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <input
      v-model="state"
      :name="name"
      :placeholder="placeholder"
      @input="onChange"
      class="p-2 border w-100 rounded"
      type="text"
    >
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  placeholder: String,
  name: String
})

const state = ref('');

const emit = defineEmits(['changeInput'])

const onChange = ()=>{
  emit('changeInput', state.value, props.name)
}
</script>