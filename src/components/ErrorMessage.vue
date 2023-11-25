<script setup lang="ts">
const props = defineProps({
  errorMessage: String,
});
</script>

<template>
  <span class="error-message">{{ props.errorMessage }}</span>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
