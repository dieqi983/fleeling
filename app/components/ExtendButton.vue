<template>
  <div
    :style="cssVariables"
    ref="buttonRef"
    class="extend-button"
    :class="{isOpen: props.modelValue, isClosing}"
    @click="handleClick"
  >
    <div 
      class="normal-state" 
      :class="{hidden: props.modelValue && !isClosing}"
    >
      <div class="expand-circle" :style="circleStyle"></div>
      <span class="button-text">{{ props.normalText }}</span>
      <span class="hover-text">{{ props.hoverText }}</span>
    </div>

    <div 
      class="expanded-state" 
      :class="{visible: props.modelValue}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ 
  buttonSize: {
    type: Object,
    default: () => {
      return {
        width: 140,
        height: 50,
      }
    }
  },
  borderRadius: {
    type: Number,
    default: 50
  },
  coverSpeed: {
    type: Number,
    default: 0.6
  },
  buttonColor: {
    type: String,
    default: 'black'
  },
  coverColor: {
    type: String,
    default: 'rgb(236, 119, 2)'
  },
  normalText: {
    type: String,
    default: '展开'
  },
  hoverText: {
    type: String,
    default: '展开'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  expandedSize: {
    type: Object,
    default: () => {
      return {
        width: 300,
        height: 700,
      }
    }
  }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])
// 状态管理
const buttonRef = ref(null)
const isClosing = ref(false)
const isHovering = ref(false)
const isAnimating = ref(false)
let closeTimeout = null

// 使用组合式函数
const { x: mouseX, y: mouseY, isInside } = useMousePosition(buttonRef)

// 监听鼠标进入/离开
watch(isInside, (newValue) => {
  if (props.modelValue) return // 展开状态下不处理悬停效果
  
  isHovering.value = newValue
  
  if (newValue) {
    isAnimating.value = true
  } else {
    // 鼠标离开后延迟重置动画状态
    setTimeout(() => {
      if (!props.modelValue) {
        isAnimating.value = false
      }
    }, props.coverSpeed * 1000)
  }
})
// 圆形样式计算
const circleStyle = computed(() => {
  if ((!isHovering.value && !isAnimating.value) || props.modelValue) {
    return {
      transform: 'scale(0)',
      opacity: 0
    }
  }
  
  return {
    '--mouse-x': mouseX.value + 'px',
    '--mouse-y': mouseY.value + 'px',
    transform: isHovering.value ? 'scale(1)' : 'scale(0)',
    opacity: isHovering.value ? 1 : 0
  }
})
// 监听展开状态变化
watch(() => props.modelValue, (newValue) => {
  newValue ? handleOpen() : handleClose()
})

// 处理点击
const handleClick = () => {
  if (!props.modelValue) {
    emit('update:modelValue', true)
    emit('open')
  }
}

// 打开操作
const handleOpen = () => {
  if (isClosing.value) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  isClosing.value = false
  isHovering.value = false
  isAnimating.value = false
}

// 关闭操作
const handleClose = () => {
  if (isClosing.value) return
  isClosing.value = true
  closeTimeout = setTimeout(() => {
    isClosing.value = false
    closeTimeout = null
    emit('close')
  }, 200)
}

// CSS 变量
const cssVariables = computed(() => {
  return {
    '--button-width': props.buttonSize.width + 'px',
    '--button-height': props.buttonSize.height + 'px',
    '--expanded-width': props.expandedSize.width + 'px',
    '--expanded-height': props.expandedSize.height + 'px',
    '--border-radius': props.borderRadius + 'px',
    '--button-color': props.buttonColor,
    '--cover-speed': props.coverSpeed + 's',
    '--cover-color': props.coverColor,
    '--cover-size': Math.max(
      parseInt(props.buttonSize.width), 
      parseInt(props.buttonSize.height)
    ) * 2.5 + 'px'
  }
})



// 暴露方法
defineExpose({
  open: () => emit('update:modelValue', true),
  close: () => emit('update:modelValue', false),
  toggle: () => emit('update:modelValue', !props.modelValue)
})

// 清理
onUnmounted(() => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
})
</script>

<style lang="scss" scoped>
.extend-button {
  position: relative;
  width: var(--button-width, 180px);
  height: var(--button-height, 50px);
  border-radius: var(--border-radius, 50px);
  background-color: var(--button-color, 'black');
  border: none;
  cursor: pointer;
  overflow: hidden;
  &.isOpen {
    width: var(--expanded-width, 300px);
    height: var(--expanded-height, 600px);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    cursor: default;
  }
  
  &.isClosing {
    width: var(--button-width, 180px);
    height: var(--button-height, 50px);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  }
  
  .normal-state {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    visibility: visible;
    &.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
  }
  
  .expanded-state {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    
    &.visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }
  
  .button-text,
  .hover-text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(246, 221, 233);
    font-size: 20px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 500;
    transition: all var(--cover-speed, 0.6s) cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
  }
  
  .button-text {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hover-text {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .expand-circle {
    position: absolute;
    width: var(--cover-size, 360px);
    height: var(--cover-size, 360px);
    border-radius: 50%;
    background-color: var(--cover-color, rgba(0, 0, 0, 0.8));
    left: calc(var(--mouse-x, 50%) - (var(--cover-size, 360px) / 2));
    top: calc(var(--mouse-y, 50%) - (var(--cover-size, 360px) / 2));
    transform-origin: center;
    transform: scale(0);
    opacity: 0;
    transition: all var(--cover-speed, 0.6s) cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 1;
  }
  
  &:not(.isOpen):hover {
    cursor: pointer;
    
    .button-text {
      opacity: 0;
      transform: translateY(-30px);
    }
    
    .hover-text {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &.isOpen {
    .button-text,
    .hover-text {
      opacity: 0 !important;
      pointer-events: none;
    }
    
    .expand-circle {
      opacity: 0 !important;
      transform: scale(0) !important;
    }
  }
  
  &.isClosing {
    .expanded-state {
      transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s,
                  visibility 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    }
  }
}
</style>