<template>
    <div
      class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
    >
      <img
      :src="favored ? heartFilled : heartOutline"
      @click="emit('favor', car.id)"
      class="absolute w-7 right-5 top-2 z-20"
      alt=""
      >
      <div
      @click="navigateTo(`/car/${car.name}-${car.id}`)"
      class="flex h-full"
      >        
      <NuxtImg :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`" alt="" class="w-[300px] h-full" />
      
      <div class="p-4 flex flex-col">
        <div>
          <h1 class="text-2xl text-blue-700">
            {{ car.name }}
          </h1>
          <p class="text-gray-700">{{ car.description }}</p>
        </div>
        <h1 class="mt-auto text-xl">${{ car.price }}</h1>
      </div>
    </div>
    </div>
</template>

<script setup>
import heartOutline from '@/assets/heartOutline.png';
import heartFilled from '@/assets/heartFilled.png';
const config = useRuntimeConfig()
const props = defineProps({
  car: Object,
  favored: Boolean
});

const emit = defineEmits(['favor'])

// make the useState unique, by passing the id
//const favored = useState(`favored-${car.id}`, () => false);

</script>