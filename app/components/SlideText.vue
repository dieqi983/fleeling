<template>
  <div class="inline-grid grid-areas-content text-2xl 2xl:text-4xl" ref="rootRef">
    <!-- 当前文字 -->
    <div class="grid-area-content inline-flex justify-center items-center w-full h-full">
      <span 
        v-for="(char, index) in currentChars" 
        :key="`current-${index}`"
        class="inline-block min-w-[0.5em] text-center will-change-transform-opacity"
        :style="{ color: textColor }"
        :ref="(el) => currentCharsRefs.setRef(el, index)"
      >
        {{ char }}
      </span>
    </div>
    
    <!-- 新文字 -->
    <div v-if="showNext" class="grid-area-content inline-flex justify-center items-center w-full h-full">  
      <span 
        v-for="(char, index) in nextChars" 
        :key="`next-${index}`"
        class="inline-block min-w-[0.5em] text-center will-change-transform-opacity"
        :style="{ color: textColor }"
        :ref="(el) => nextCharsRefs.setRef(el, index)"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
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
  },
  textColor: {
    type: String,
    default: 'rgb(0,0,0)',
  }
})

const emit = defineEmits(['animation-start', 'animation-end'])

const currentText = ref('')
const nextText = ref('')
const showNext = ref(false)
const rootRef = ref(null)
let isAnimating = false
let pendingText = null
let ctx

const currentCharsRefs = useDynamicRefs()
const nextCharsRefs = useDynamicRefs()

const currentChars = useTextToChars(currentText)
const nextChars = useTextToChars(nextText)
const textColor = computed(() => props.textColor)

const getValidElements = (refs) => {
  return refs.refs.value.filter(el => el)
}

const exitAnimation = () => {
  const currentElements = getValidElements(currentCharsRefs)
  if (currentElements.length === 0) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    ctx.add(() => {
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
      gsap.set(nextElements, {
        y: '100%',
        opacity: 0
      })
      
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

const resetCurrentStyles = () => {
  const currentElements = getValidElements(currentCharsRefs)
  if (currentElements.length === 0) return
  gsap.set(currentElements, { clearProps: 'all' })
}

const switchText = async (newText) => {
  if (!newText) return

  if (isAnimating) {
    pendingText = newText
    return
  }

  isAnimating = true
  pendingText = null

  nextText.value = newText
  showNext.value = true
  
  emit('animation-start', { from: currentText.value, to: newText })
  
  await nextTick()
  await Promise.all([
    exitAnimation(),
    enterAnimation()
  ])
  
  resetCurrentStyles()
  currentText.value = newText
  showNext.value = false
  
  emit('animation-end', { text: newText })
  isAnimating = false
  
  if (pendingText && pendingText !== currentText.value) {
    const next = pendingText
    pendingText = null
    nextTick(() => {
      switchText(next)
    })
  }
}

watch(() => props.text, (newText) => {
  if (newText && newText !== currentText.value) {
    switchText(newText)
  }
})

onMounted(() => {
  ctx = gsap.context(() => {}, rootRef.value)

  if (props.text) {
    currentText.value = props.text
  }
})

onUnmounted(() => {
  ctx?.revert?.()
})

defineExpose({
  switchText,
  forceSwitchText: (newText) => {
    if (!newText) return
    currentText.value = '' 
    nextTick(() => {
      switchText(newText)
    })
  }
})
</script>

<style scoped>
/* Tailwind 无法直接支持 grid-template-areas 的简写，需要自定义工具类 */
.grid-areas-content {
  grid-template-areas: "content";
}

.grid-area-content {
  grid-area: content;
}

/* 确保 v-bind 仍然生效，或者改成通过 style 动态绑定 */
</style>