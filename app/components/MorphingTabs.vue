<template>
  <div
    v-if="props.tabs.length"
    style="filter: url(&quot;#exclusionTabsGoo&quot;)"
    :class="cn(`relative`, props.class)"
  >
    <button
      v-for="tab in props.tabs"
      :key="tab"
      type="button"
      class="bg-primary text-background px-4 py-2 transition-all duration-500"
      :style="{
        margin: `0 ${activeTab === tab ? props.margin : 0}px`,
      }"
      @click="emit('update:activeTab', tab)"
    >
      {{ tab }}
    </button>

    <div class="pointer-events-none absolute w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter
            id="exclusionTabsGoo"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              :stdDeviation="props.blurStdDeviation"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 36 -12"
              result="goo"
            />
            <feComposite
              in="SourceGraphic"
              in2="goo"
              operator="atop"
            />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { cn } from "@inspira-ui/plugins";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => []
  },
  activeTab: {
    type: String,
    required: true,
    default: ""
  },
  margin: {
    type: Number,
    default: 20
  },
  class: {
    type: String,
    default: ""
  },
  blurStdDeviation: {
    type: Number,
    default: 6
  }
});

const emit = defineEmits(["update:activeTab"]);
</script>
