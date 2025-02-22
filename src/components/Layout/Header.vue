<script setup lang="ts">
import Logo from "./Logo.vue";
import {useUserStore} from "../../store/user"
import {useRouter} from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push("/login");
}
</script>

<template>

  <header>
    <div class="container">
      <div class="flex items-center gap-4 py-5">

        <div class="flex-1">
          <Logo />
        </div>

        <div v-if="userStore.isLoggedIn">
          <span class="font-medium text-sm pr-5">{{ userStore.getUserName }}</span>
          <a class="btn" @click="logout()">Logout</a>
        </div>
      </div>
    </div>

    <nav v-if="false">
      <div class="container">
        <div class="flex gap-5 font-semibold">
          <RouterLink to="login">Login</RouterLink>
          <RouterLink to="/">Dashboard</RouterLink>
          <RouterLink to="help">Help</RouterLink>
        </div>
      </div>
    </nav>
  </header>

</template>

<style scoped>

</style>