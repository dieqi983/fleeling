<template>
  <div :class="cn(`flex flex-1 flex-col p-8 md:p-10`, props.class)">
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