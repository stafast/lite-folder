<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from 'vue-router';
import {useUserStore} from "@/store/user"

const router = useRouter();
const userStore = useUserStore();

const username = ref<string>('')
const password = ref<string>('978zas+*+a2')
const loginError = ref<string>('')

const handleSignUp = () => {
  loginError.value = '';
  username.value = 'Anna';
}

const login = () => {
  loginError.value = '';

  // FAKE: Check login credentials
  if (!username.value.trim() || !password.value.trim()) {
    loginError.value = 'Username and/or password is required!';
    return;
  }

  if (!username.value.trim() || !password.value.trim()) {
    loginError.value = 'Credentials a are wrong!';
    return;
  }

  // Handle login
  userStore.login(username.value);
  router.push('/');
}
</script>

<template>

  <div class="container flex">

    <div class="mx-auto rounded-lg border border-stone-400/10 bg-stone-50 px-14 py-10 shadow-lg">

      <form @submit.prevent="login()" class="flex flex-col gap-4 w-[275px]" autocomplete="off">

        <p class="mb-3 font-semibold">Welcome back!</p>

        <label class="block" for="username">
          <span class="block text-sm font-medium mb-1.5">Username</span>
          <input class="w-full border" id="username" v-model="username" type="text" placeholder="Enter your username …" />
        </label>
        <label for="password">
          <span class="block text-sm font-medium mb-1.5">Password</span>
          <input class="w-full border" id="password" v-model="password" type="password" />
        </label>
        <div class="mt-2 mb-2">
          <button type="submit" class="w-full btn btn-primary">Sign in</button>
          <Transition>
            <p v-if="loginError.length" class="mt-4 text-sm font-medium text-red-600">
              {{ loginError }}
            </p>
          </Transition>
        </div>
        <div class="text-sm">
          <span>Don't have an account?</span> <a class="font-semibold text-blue-600 transition-colors hover:text-blue-800" href="#" @click="handleSignUp">Sign up</a>
        </div>
      </form>

    </div>
  </div>

</template>

<style scoped>

</style>