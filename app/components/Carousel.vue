<template>
  <div
    class="show-container"
    ref="showWindowRef"
    @click="turnPage"
  >
    <div 
      class="imgs-container"
      :style="containerStyle"
    >
      <div 
        class="img-box" 
        v-for="(item,index) in props.imgs"
        :key="item+index"
      >
        <img :src="item" alt="">
      </div>
    </div>
  </div>  
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useMousePosition } from '../composables/useMousePosition';

const props = defineProps({
  imgs: {
    type: Array,
    default: () => [],
  }
})

const currentIndex = ref(0)
const showWindowRef = ref(null)
const showWindowWidth = ref(0)
const {x:mouseX}=useMousePosition(showWindowRef)
// 计算移动样式
const containerStyle = computed(() => {
  const distance = -currentIndex.value * showWindowWidth.value
  return {
    transform: `translateX(${distance}px)`,
    transition: 'transform 0.3s ease' 
  }
})

const turnPage = () => {
  if (!showWindowRef.value) return
  
  const rect = showWindowRef.value.getBoundingClientRect()
  const centerX = rect.width / 2
  
  if (mouseX.value > centerX) {
    if (currentIndex.value < props.imgs.length - 1) {
      currentIndex.value++
    }
  } else {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }
}

onMounted(() => {
  showWindowWidth.value = showWindowRef.value.clientWidth
  
  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    showWindowWidth.value = showWindowRef.value.clientWidth
  })
})
</script>

<style lang="scss" scoped>
.show-container {
  height: 100%; 
  width: 100%;
  border: solid rgb(241, 98, 3) 2px;
  border-radius: 10px;
  overflow: hidden;
  &:hover{
    cursor: pointer;
  }
  .imgs-container {
    display: flex;
    height: 100%;
    width: 100%;
    .img-box {
      flex: 0 0 100%;
      height: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
}
</style>