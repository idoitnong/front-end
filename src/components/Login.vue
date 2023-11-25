<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { ValidationError, object, string } from "yup";
import ErrorMessage from "./ErrorMessage.vue";
import axios from "axios";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const errors = ref<{ [key: string]: string[] }>({});
const systemMessage = ref("");

let userSchema = object({
  username: string().required("아이디는 필수 입력 항목입니다."),
  password: string().required("비밀번호는 필수 입력 항목입니다."),
});

const handleAxiosError = (error: any) => {
  if (error.response && error.response.status >= 400) {
    systemMessage.value = error.response.data.message;
  } else {
    systemMessage.value = error.message;
  }
};

const handleValidationError = (error: ValidationError) => {
  error.inner.forEach((validationError) => {
    const path = validationError.path as keyof typeof errors.value;
    errors.value[path] = [validationError.message];
  });
};

const login = async () => {
  try {
    errors.value = {};
    await userSchema.validate({ username: username.value, password: password.value }, { abortEarly: false });

    await authStore.login({ username: username.value, password: password.value });
    systemMessage.value = `로그인 성공! ${username.value}님 안녕하세요.\r\ntoken: ${authStore.token}`;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else if (error instanceof ValidationError) {
      handleValidationError(error);
    } else {
      systemMessage.value = error.message;
    }
  }
};
</script>

<template>
  <form @submit.prevent="login">
    <div>
      <input type="text" v-model="username" placeholder="아이디" />
      <ErrorMessage v-if="errors.username" :errorMessage="errors.username[0]" />
    </div>
    <div>
      <input type="password" v-model="password" placeholder="비밀번호" />
      <ErrorMessage v-if="errors.password" :errorMessage="errors.password[0]" />
    </div>
    <div>
      <button type="submit">로그인</button>
    </div>
    <div>
      <span>{{ systemMessage }}</span>
    </div>
  </form>
</template>

<style scoped></style>
