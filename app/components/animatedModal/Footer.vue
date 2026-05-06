<template>
  <div :class="cn(`flex justify-end bg-gray-100 p-4 dark:bg-neutral-900`, props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from "@inspira-ui/plugins";

const props = defineProps({
  class: {
    type: String,
    default: ""
  }
});
</script>