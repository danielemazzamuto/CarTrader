<template>
  <div class="rounded shadow mt-20">
    <CarMessageCard />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'custom',
  middleware: ['auth'],
})

const { id } = useRoute().params;

</script>