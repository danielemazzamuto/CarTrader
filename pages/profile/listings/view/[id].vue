<template>
  <div class="rounded shadow mt-20">
    <CarMessageCard />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'custom'
})

const { id } = useRoute().params;

</script>