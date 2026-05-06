<template>
  <div>
    <slot
      :open="open"
      :open-modal="openModal"
      :close-modal="closeModal"
      :toggle="toggle"
    />
  </div>

</template>

<script setup>
import { computed, provide, ref } from "vue";
import { useEventListener } from "@vueuse/core";


// JavaScript 中直接定义 props，不使用 withDefaults
const props = defineProps({
  open: {
    type: Boolean,
    default: undefined
  },
  defaultOpen: {
    type: Boolean,
    default: false
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["update:open", "open", "close"]);

const internalOpen = ref(props.defaultOpen);
const isControlled = computed(() => props.open !== undefined);
const open = computed({
  get() {
    return isControlled.value ? Boolean(props.open) : internalOpen.value;
  },
  set(value) {
    if (!isControlled.value) internalOpen.value = value;
    emit("update:open", value);
  },
});

const setOpen = (value) => {
  open.value = value;
};

const openModal = () => {
  if (open.value) return;
  setOpen(true);
  emit("open");
};

const closeModal = () => {
  if (!open.value) return;
  setOpen(false);
  emit("close");
};

const toggle = () => {
  if (open.value) closeModal();
  else openModal();
};

const ctx = { open, setOpen, openModal, closeModal, toggle };
provide(ANIMATED_MODAL_KEY, ctx);

if (typeof window !== 'undefined') {
  useEventListener(window, "keydown", (event) => {
    if (!props.closeOnEsc) return;
    if (!open.value) return;
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeModal();
  });
}
</script>