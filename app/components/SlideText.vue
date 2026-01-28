<template>
  <div class="text-switcher" ref="rootRef">
    <!-- 当前文字 -->
    <div class="text-container">
      <span 
        v-for="(char, index) in currentChars" 
        :key="`current-${index}`"
        class="char"
        :ref="(el) => currentCharsRefs.setRef(el, index)"
      >
        {{ char }}
      </span>
    </div>
    
    <!-- 新文字 -->
    <div v-if="showNext" class="text-container">  
      <span 
        v-for="(char, index) in nextChars" 
        :key="`next-${index}`"
        class="char"
        :ref="(el) => nextCharsRefs.setRef(el, index)"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ref, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { useDynamicRefs } from '@/composables/useDynamicRefs'
import { useTextToChars } from '../composables/useTextToCharts'

const props = defineProps({
  // 外部传入的字符串，每次变化都会触发动画
  text: {
    type: String,
    required: true
  },
  // 动画参数
  duration: {
    type: Number,
    default: 0.3
  },
  stagger: {
    type: Number,
    default: 0.1
  },
  ease: {
    type: String,
    default: 'power2.out'
  }
})

const emit = defineEmits(['animation-start', 'animation-end'])

// 内部状态
const currentText = ref('')      // 当前显示的文字
const nextText = ref('')         // 准备切换的新文字
const showNext = ref(false)      // 是否显示新文字容器
const rootRef=ref(null)
let isAnimating = false   // 动画锁
let pendingText = null   // 待处理的文字
// GSAP Context 实例
let ctx

// DOM 引用收集
const currentCharsRefs = useDynamicRefs()
const nextCharsRefs = useDynamicRefs()

// 计算属性
const currentChars = useTextToChars(currentText)
const nextChars = useTextToChars(nextText)

// 工具函数：获取有效的 DOM 元素
const getValidElements = (refs) => {
  return refs.refs.value.filter(el => el)
}


// 动画函数（使用 GSAP Context）
const exitAnimation = () => {
  const currentElements = getValidElements(currentCharsRefs)
  if (currentElements.length === 0) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    // 创建 GSAP Context
    ctx.add(() => {
      // 在上下文中创建动画
      gsap.to(currentElements, {
        y: '-100%',
        opacity: 0,
        duration: props.duration,
        stagger: props.stagger,
        ease: props.ease,
        onComplete: resolve
      })
    })
  })
}

const enterAnimation = () => {
  const nextElements = getValidElements(nextCharsRefs)
  if (nextElements.length === 0) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
     ctx.add(() => {
      // 设置初始状态
      gsap.set(nextElements, {
        y: '100%',
        opacity: 0
      })
      
      // 执行进入动画
      gsap.to(nextElements, {
        y: '0%',
        opacity: 1,
        duration: props.duration,
        stagger: props.stagger,
        ease: props.ease,
        onComplete: resolve
      })
    })
  })
}

// 清除当前文字的内联样式
const resetCurrentStyles = () => {
  const currentElements = getValidElements(currentCharsRefs)
  if (currentElements.length === 0) return
  gsap.set(currentElements, { clearProps: 'all' })
}

// 主切换函数
const switchText = async (newText) => {
  if (!newText) return

  // 如果正在动画中，排队处理
  if (isAnimating) {
    pendingText = newText
    return
  }

  // 开始新动画
  isAnimating = true
  pendingText = null

  // 设置新文字
  nextText.value = newText
  showNext.value = true
  
  // 触发开始事件
  emit('animation-start', { from: currentText.value, to: newText })
  
  // 等待 DOM 更新
  await nextTick()
    await Promise.all([
      exitAnimation(),
      enterAnimation()
    ])
    
    // 重置当前文字样式
    resetCurrentStyles()
    // 更新状态
    currentText.value = newText
    showNext.value = false
    
    // 触发结束事件
    emit('animation-end', { text: newText })
    isAnimating = false
    
    // 检查是否有待处理的文字
    if (pendingText && pendingText !== currentText.value) {
      const next = pendingText
      pendingText = null
      // 使用 nextTick 确保 DOM 已经更新
      nextTick(() => {
        switchText(next)
      })
    }
}

// 监听 props.text 变化
watch(() => props.text, (newText) => {
  if (newText && newText !== currentText.value) {
    switchText(newText)
  }
})

// 初始化
onMounted(() => {
  ctx=gsap.context(()=>{},rootRef.value)
  if (props.text) {
    currentText.value = props.text
  }
})

// 组件卸载时清理所有动画
onUnmounted(() => {
  ctx?.revert?.()
})

// 暴露方法给父组件
defineExpose({
  switchText,
  // 强制切换（即使相同文字也动画）
  forceSwitchText: (newText) => {
    if (!newText) return
    currentText.value = '' 
    nextTick(() => {
      switchText(newText)
    })
  }
})
</script>

<style lang="scss" scoped>
.text-switcher {
  display: inline-grid;
  grid-template-areas: "content";
  font-family: 'Arial', sans-serif;
  font-size: var(--text-size-sm);
  user-select: none;
  min-height: 1.2em;
  font-weight: 500;
  .text-container {
    grid-area: content;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .char {
    display: inline-block;
    min-width: 0.5em;
    text-align: center;
    will-change: transform, opacity; /* 优化动画性能 */
  }
}
</style>