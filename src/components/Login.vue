<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");

const login = async () => {
  try {
    await authStore.login({ username: username.value, password: password.value });
    alert(`로그인 성공! ${username.value}님 안녕하세요.\ntoken: ${authStore.token}`);
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
</script>

<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <label for="username">아이디:</label>
      <input type="text" v-model="username" required />
      <br />
      <label for="password">비밀번호:</label>
      <input type="password" v-model="password" required />
      <br />
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<style scoped></style>
