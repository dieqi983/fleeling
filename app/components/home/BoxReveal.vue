<template>
  <div :class="cn('relative', props.class)">
    <Motion
      :initial="initialMainVariants"
      :while-in-view="visibleMainVariants"
      :transition="{
        duration: props.duration,
        delay: props.delay * 2,
      }"
    >
      <slot />
    </Motion>
    <Motion
      class="box-background absolute inset-0 z-20"
      :initial="initialSlideVariants"
      :while-in-view="visibleSlideVariants"
      :transition="{
        duration: props.duration,
        ease: 'easeIn',
        delay: props.delay,
      }"
    />
  </div>
</template>

<script setup>
import { cn } from "@inspira-ui/plugins";
import { Motion } from "motion-v";

const props = defineProps({
  color: {
    type: String,
    default: "#5046e6"
  },
  duration: {
    type: Number,
    default: 0.5
  },
  delay: {
    type: Number,
    default: 0.25
  },
  class: {
    type: String,
    default: ""
  }
})

// Motion variants
const initialMainVariants = { opacity: 0, y: 25 }
const visibleMainVariants = { opacity: 1, y: 0 }

const initialSlideVariants = { left: "0%" }
const visibleSlideVariants = { left: "100%" }
</script>

<style scoped>
.box-background {
  background: v-bind(color);
}
</style>