<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route" />
  </router-view>
</template>
