<template>
  <div 
  class="keywords-container"
  ref="rootRef"
  >
    <p 
    v-for="(text,index) in keyTexts"
    :key="text+'-'+index"
    :ref="(el)=>pRefs.setRef(el,index)"
    >
    {{text}}
    </p>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
const props=defineProps({
  keyTexts:{
    type:Array,
    default:()=>[],
  }
})
const rootRef=ref(null)
let ctx
const pRefs=useDynamicRefs()
const enterAnimation=(elements)=>{
   ctx.add(()=>{
    const tl=gsap.timeline()
    elements.forEach(element => {
      tl.from(element,{
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
      })
    });
  })
}
watch(
  () => props.keyTexts,
  (val) => {
    if (!val || !val.length) return
    nextTick(() => {
      ctx?.revert()
      enterAnimation(pRefs.refs.value)
    })
  }
)
onMounted(()=>{
  ctx=gsap.context(()=>{},rootRef.value)
  enterAnimation(pRefs.refs.value)
})
onUnmounted(()=>{
  ctx?.revert()
})
</script>
<style lang="scss" scoped>
.keywords-container{
  width: 100%;
  margin-bottom: 20px;
  p{
    white-space: nowrap;
    font-size: var(--text-size-sm);
    color:var(--text-color);
    &.is-hidden {
      visibility: hidden;
      opacity: 0;
    }
  } 
}
</style>