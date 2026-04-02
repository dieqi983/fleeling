<template>
  <div class="draw-container" ref="containerRef">
    <img 
      ref="oldImgRef"
      :src="oldPath" 
      alt=""
      class="draw-image old-image"
    />
    <img 
      ref="newImgRef"
      :src="newPath" 
      alt=""
      class="draw-image new-image"
    />
    <div class="move-bar"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const oldPath = ref(props.path)
const newPath = ref(props.path)
const oldImgRef = ref(null)
const newImgRef = ref(null)
let isAnimating = false
let pendingPath = null // 待处理的路径

onMounted(() => {
  if (newImgRef.value) {
    gsap.set(newImgRef.value, { opacity: 0, scale: 0.8, y: 0, rotation: 0 })
  }
})

// 执行动画的核心函数
const performAnimation = async (nextPath) => {
  if (!oldImgRef.value || !newImgRef.value) return
  
  // 准备新图片
  newPath.value = nextPath
  
  gsap.set(newImgRef.value, { 
    opacity: 0, 
    scale: 0.5, 
    y: 0, 
    rotation: 0,
    display: 'block'
  })
  
  // 创建时间线，同时执行两个动画
  const tl = gsap.timeline({
    onComplete: () => {
      // 动画完成后，将旧图片更新为当前显示的图片
      oldPath.value = nextPath
      gsap.set(oldImgRef.value, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0 })
      gsap.set(newImgRef.value, { opacity: 0, display: 'none' })
      
      isAnimating = false
      
      // 检查是否有待处理的切换
      if (pendingPath !== null && pendingPath !== nextPath) {
        const nextPending = pendingPath
        pendingPath = null
        startAnimation(nextPending)
      }
    }
  })
  
  tl.to(oldImgRef.value, {
    rotation: -45,
    y: -200,
    x: -200,
    opacity: 0,
    duration: 0.6,
    ease: "power2.in",
  }, 0)
  
  tl.to(newImgRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out",
  }, 0)
}

// 启动动画（带防并发）
const startAnimation = async (nextPath) => {
  if (isAnimating) {
    // 正在动画中，记录最新的待处理路径
    pendingPath = nextPath
    return
  }
  
  // 如果新旧路径相同，不执行动画
  if (nextPath === oldPath.value) return
  
  isAnimating = true
  await performAnimation(nextPath)
}

// 监听 path 变化
watch(() => props.path, async (newPath, oldPathValue) => {
  if (newPath !== oldPathValue) {
    startAnimation(newPath)
  }
})
</script>

<style lang="scss" scoped>
.draw-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  transform: scale(1);
  transition: all 0.3s ease;
  
  &:hover {
    .move-bar {
      animation: twinkle ease-in-out 0.3s forwards;
    }
    transform: scale(1.1);
  }
  
  .draw-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 5;
    will-change: transform, opacity;
    pointer-events: none;
  }
  
  .old-image {
    z-index: 5;
  }
  
  .new-image {
    z-index: 6;
    display: none;
  }
  
  .move-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    transform-origin: left center;
    z-index: 10;
    background-color: var(--button-bg-color);
    pointer-events: none;
  }
  
  @keyframes twinkle {
    0% {
      transform: scaleX(0);
      transform-origin: left center;
    }
    50% {
      transform: scaleX(1);
      transform-origin: left center;
    }
    51% {
      transform-origin: right center;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right center;
    }
  }
}
</style>