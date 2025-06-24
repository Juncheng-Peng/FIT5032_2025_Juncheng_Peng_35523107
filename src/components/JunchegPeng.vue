<template>
  <div class="welcome">
    <h1>欢迎回来，{{ userName }}</h1>
  </div>
</template>
<style>
    .welcome{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<script setup>
import { ref } from 'vue'
const userName = ref('Juncheng Peng')
</script>