<template>
  <div class="draw-container" ref="containerRef">
    <!-- 旧图片 -->
    <img 
      ref="oldImgRef"
      :src="oldPath" 
      alt=""
      class="draw-image old-image"
    />
    <!-- 新图片 -->
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
const containerRef = ref(null)
let isAnimating = false

// 初始化：新图片透明不可见
onMounted(() => {
  if (newImgRef.value) {
    gsap.set(newImgRef.value, { opacity: 0, scale: 0.8, y: 0, rotation: 0 })
  }
})

// 退场动画 + 新图片渐显
const exitAndShowAnimation = (nextPath) => {
  return new Promise((resolve) => {
    if (!oldImgRef.value || !newImgRef.value) {
      resolve()
      return
    }
    
    // 准备新图片
    newPath.value = nextPath
    gsap.set(newImgRef.value, { 
      opacity: 0, 
      scale: 0.8, 
      y: 0, 
      rotation: 0,
      display: 'block'
    })
    
    // 创建时间线，同时执行两个动画
    const tl = gsap.timeline({
      onComplete: () => {
        // 动画完成后，将新图片设为显示，旧图片隐藏
        oldPath.value = nextPath
        gsap.set(oldImgRef.value, { opacity: 1, scale: 1, y: 0, rotation: 0 })
        gsap.set(newImgRef.value, { opacity: 0, display: 'none' })
        resolve()
      }
    })
    
    // 旧图片退场动画：倾斜 -> 缩小 -> 上移消失
    tl.to(oldImgRef.value, {
      rotation: -90,
      duration: 1,
      ease: "power2.in",
    }, 0)
    // .to(oldImgRef.value, {
    //   y: -200,
    //   duration: 0.5,
    //   ease: "power2.in",
    // }, 0.3) 
    // .to(oldImgRef.value, {
    //   scale: 0.6,
    //   duration: 0.2,
    //   ease: "power2.in",
    // }, 0.2)
    
    // 新图片进场动画：从透明到完全显示
    tl.to(newImgRef.value, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    }, 0)
  })
}

// 监听 path 变化
watch(() => props.path, async (newPath, oldPathValue) => {
  if (newPath !== oldPathValue && !isAnimating) {
    isAnimating = true
    
    // 执行退场 + 新图片渐显动画
    await exitAndShowAnimation(newPath)
    
    isAnimating = false
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