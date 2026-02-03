<template>
  <div class="fixed-marquee" ref="containerRef">
    <div class="marquee-content" ref="contentRef">
      <span 
      class="text"
      v-for="(id,index) in spanArr" 
      :key="id"
      :ref="(el)=>{spanRefs.setRef(el,index)}"
      >
        {{text}}
      </span>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  },
  speed: {
    type: Number,
    default: 70
  }
})
const spanArr=[0,1,2]
const containerRef = ref(null)
const contentRef = ref(null)
let ctx = null // GSAP context 实例
const spanRefs=useDynamicRefs()
onMounted(() => {
  initMarquee()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cleanup()
  window.removeEventListener('resize', handleResize)
})

const initMarquee = () => {
  // 初始化 GSAP context
  ctx = gsap.context(() => {
    setupMarquee()
  }, containerRef.value) // 绑定到容器元素
}

const setupMarquee = () => {
  if (!containerRef.value || !contentRef.value) return
  
  const container = containerRef.value
  const content = contentRef.value
  const containerWidth = container.offsetWidth
  const textElements = spanRefs.refs.value
  
  if (textElements.length === 0) return
  
  const singleTextWidth = textElements[0].offsetWidth
  
  // 如果文字比容器短，居中显示
  if (singleTextWidth <= containerWidth) {
    gsap.set(content, { 
      x: (containerWidth - singleTextWidth) / 2 
    })
    return
  }
  
  const offset = singleTextWidth
  const duration = offset / props.speed
  
  // 使用 context 内的 gsap 方法
  gsap.set(content, { x: 0 })
  
  // 创建动画 - 会自动被 context 管理
  gsap.to(content, {
    x: -offset,
    duration: duration,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => {
        const result = x % offset
        return result <= -offset ? result + offset : result
      })
    }
  })
}
let resizeTimeout = null
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    // 使用 context 的 add 方法动态添加新的动画逻辑
    ctx.revert() 
    if (ctx) {
      initMarquee()
    }
  }, 250)
}

const cleanup = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }
  
  if (ctx) {
    ctx.revert() // 一键清理所有动画和事件
    ctx = null
  }
}

// 监听属性变化
watch(() => [props.speed, props.text], () => {
  nextTick(() => {
    if (ctx) {
      // 清理并重新设置
      ctx.revert()
      initMarquee()
    }
  })
}, { deep: true })
</script>

<style lang="scss" scoped>
.fixed-marquee {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  .marquee-content {
    position: absolute;
    display: flex;
    height: 100%;
    align-items: center;
    white-space: nowrap;
    will-change: transform;
    
    .text {
      font-size: 50px;
      color: inherit;
      flex-shrink: 0;
      padding: 0 25px;
    }
  }
}
</style>