<template>
  <div class="show-window-container">
    <div class="slide-main-box" :class="{ vertical: direction === 'vertical' }">
      <div 
        v-for="(item, index) in allSlots"
        :key="index"
        class="slide-box"
      >
        <component :is="allSlots[index]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlots, computed } from 'vue'

const slots = useSlots()
const allSlots = slots.default() || []

const props = defineProps({
  currentIndex: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'horizontal', // 'horizontal' 或 'vertical'
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  }
})

const transformStyle = computed(() => {
  if (!allSlots.length) return 'translate(0, 0)'
  
  let targetIndex = props.currentIndex
  if (targetIndex > allSlots.length - 1) targetIndex = allSlots.length - 1
  if (targetIndex < 0) targetIndex = 0
  
  if (props.direction === 'vertical') {
    return `translateY(-${targetIndex * 100}%)`
  } else {
    return `translateX(-${targetIndex * 100}%)`
  }
})

const totalPages = computed(() => allSlots.length)

defineExpose({
  totalPages
})
</script>

<style lang="scss" scoped>
.show-window-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  
  .slide-main-box {
    transform: v-bind(transformStyle);
    display: flex;
    height: 100%;
    width: 100%;
    transition: transform 0.3s ease;
    
    // 水平切换
    &:not(.vertical) {
      flex-direction: row;
      
      .slide-box {
        min-width: 100%;
        width: 100%;
        height: 100%;
      }
    }
    
    // 垂直切换
    &.vertical {
      flex-direction: column;
      
      .slide-box {
        min-height: 100%;
        height: 100%;
        width: 100%;
      }
    }
    
    .slide-box {
      flex-shrink: 0;
    }
  }
}
</style>