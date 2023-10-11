<template>
  <div class="col-md-5 offset-md-1 mt-2 w-[100%]">
    <label for="" class="text-cyan-500 mb-1 text-sm">Image *</label>
    <form class="mt-2">
      <div class="form-group">
        <div class="relative cursor-pointer">
          <input
            @change="onImageUpload"
            class="opacity-0 obsolute cursor-pointer"
            accept="image/*"
            type="file"
          />
          <span class="absolute left-0 pointer-events-none">Browse File</span>
        </div>
        <div v-if="image.preview" class="border p-2 mt-3 w-56">
        <img :src="image.preview" class="img-fluid">
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const image = useState('carImage', ()=>{
  return{
    preview: null,
    image: null
  }
})

const emits = defineEmits(['changeInput'])

const onImageUpload = (event) => {
  const input = event.target;
  if(input.files){
    const reader = new FileReader()
    //read the file
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    }
    //store the file
    image.value.image = input.files[0]
    reader.readAsDataURL(input.files[0])
    //emit the file
    emits('changeInput', input.files[0], 'image')
  }
}
</script>

<style lang="scss" scoped>

</style>