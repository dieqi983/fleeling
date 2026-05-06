<template>
  <component
    :is="props.as"
    :type="isButton ? 'button' : undefined"
    :disabled="isButton ? props.disabled : undefined"
    :aria-disabled="props.disabled ? 'true' : 'false'"
    aria-haspopup="dialog"
    :aria-expanded="modal.open.value ? 'true' : 'false'"
    :class="
      cn(
        `relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 text-center`,
        props.disabled && 'cursor-not-allowed opacity-60',
      )
    "
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script setup>
import { cn } from "@inspira-ui/plugins";


const props = defineProps({
  as: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const modal = inject(ANIMATED_MODAL_KEY, null);
if (!modal) {
  throw new Error("AnimatedModalTrigger must be used within <AnimatedModal>");
}

const isButton = computed(() => props.as === "button");

const onClick = (event) => {
  if (props.disabled) return;
  event.preventDefault();
  modal.openModal();
};
</script>