<template>
    <header class="sticky top-0 z-50 flex justify-between items-center space-x-3 bg-white p-4 shadow-md">
      <NuxtLink class="text-3xl font-mono" to="/">CarTrader</NuxtLink>
      <div v-if="user" class="flex">
        <NuxtLink class="mr-5" to="/profile/listings">Profile</NuxtLink>
        <p @click="logout" class="cursor-pointer">Logout</p>
      </div>
      <NuxtLink v-else to="/login">Login</NuxtLink>
    </header>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error);
  navigateTo('/')
}

// const loginLogout = computed(()=>{
//   return user.role === 'authenticated' ? 'Logout' : 'Login'
// })

</script>