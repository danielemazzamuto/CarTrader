<template>
    <div class="w-full">  
        <ClientOnly>
            <template #fallback>
                <p>Processing...</p>
            </template>  
            <CarCard
            v-for="car in cars"
            :key="car.id"
            :car="car"
            @favor="handleFavorite"
            :favored="car.id in favorite"
            />
        </ClientOnly>
    </div>
</template>

<script setup>
const { cars } = useCars();

// persist state in localStorage
const favorite = useLocalStorage(
    'favorite',
    {},
)


const handleFavorite = (id) => {
    if (id in favorite.value) {
        delete favorite.value[id];
    } else {
        favorite.value = {
            ...favorite.value,
            [id]: true
        }
    }
}
</script>