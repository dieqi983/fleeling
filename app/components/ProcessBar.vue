<template>
    <div 
      class="process-bar" 
      ref="progressBarRef"
      @click="handleBarClick"
      :style="{
        height: barHeight,
      }"
    >
      <div class="process-fill"></div>
      <div 
        v-if="props.hasDrag"
        class="progress-thumb"
        @mousedown="handleThumbMousedown"
      >
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  maxValue: {
    type: Number,
    default: 100,
  },
  hasDrag: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value) // 添加验证
  },
  barColor:{
    type:String,
    default:'rgb(0, 0, 0)'
  },
  fillColor:{
    type:String,
    default:'rgb(241, 121, 1)'
  }
})
const barColor=computed(()=>{
  return props.barColor
})
const fillColor=computed(()=>{
  return props.fillColor
})
const barHeight = computed(() => {
  if (props.size === 'sm') return '5px'
  if (props.size === 'md') return '7px'
  if (props.size === 'lg') return '10px'
})

const emit = defineEmits(['update:modelValue', 'drag-start', 'drag-end','clickBar'])

const progressBarRef = ref(null)
const isDragging = ref(false)

const fillWidth = computed(() => {
  return (props.modelValue / props.maxValue) * 100 + '%'
})

// 计算点击/拖拽位置对应的值
const calculateValueFromPosition = (clientX) => {
  if (!progressBarRef.value) return props.modelValue
  
  const rect = progressBarRef.value.getBoundingClientRect()
  let percentage = (clientX - rect.left) / rect.width
  
  // 限制在 0-1 之间
  percentage = Math.max(0, Math.min(1, percentage))
  
  return percentage * props.maxValue
}

// 更新进度条值
const updateProgress = (clientX) => {
  const newValue = calculateValueFromPosition(clientX)
  const roundedValue=Math.round(newValue)
  emit('update:modelValue', roundedValue)
  return roundedValue
}

// 处理进度条点击
const handleBarClick = (e) => {
  if (props.hasDrag) {
    const newValue=updateProgress(e.clientX)
    emit('clickBar',newValue)
  }
}

// 处理滑块拖拽开始
const handleThumbMousedown = (e) => {
  e.stopPropagation()
  e.preventDefault() 
  
  isDragging.value = true
  emit('drag-start', props.modelValue)
  
  window.addEventListener('mousemove', handleMousemove)
  window.addEventListener('mouseup', handleMouseup)
  
  // 添加拖拽时的样式类
  document.body.style.userSelect = 'none'
}

const handleMousemove = (e) => {
  if (!isDragging.value) return
  
  e.preventDefault()
  updateProgress(e.clientX)
}

const handleMouseup = () => {
  if (isDragging.value) {
    isDragging.value = false
    emit('drag-end', props.modelValue)
    
    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
    
    // 移除拖拽时的样式
    document.body.style.userSelect = ''
  }
}

// 组件卸载时清理事件监听
onUnmounted(() => {
  if (isDragging.value) {
    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
    document.body.style.userSelect = ''
  }
})
</script>

<style scoped lang="scss">
.process-bar {
  background-color: v-bind(barColor);
  width: 100%;
  position: relative;
  
  .process-fill {
    background-color: v-bind(fillColor);
    width: v-bind(fillWidth);
    height: 100%;
    pointer-events: none;
  }
  
  .progress-thumb {
    position: absolute;
    width: auto;
    height: 200%;
    aspect-ratio: 1 / 1;
    background-color: v-bind(fillColor);
    border-radius: 50%;
    top: -50%;
    transform: translateX(-50%);
    left: v-bind(fillWidth);
    transition: transform 0.1s ease;
    
    &:hover {
      transform: translateX(-50%) scale(1.2);
    }
  }
}
</style>