<template>
  <div ref="iconRef"
   class="promptIcon-container"
   v-click-outside="clickOutHandler"
   >
    <img 
    :src="iconPath" 
    alt=""
    @click="handleClick"
    >
    <div 
      v-if="props.status==='prompt' || props.status==='all'"
      v-show="isInside" 
      class="prompt-box"
      :class="{ 'visible': isInside }"
    >
      <span class="prompt-text">{{props.promptText}}</span>
    </div>
    <div 
    class="popover"
    v-if="props.status==='popover' || props.status==='all'"
    v-show="isPopUp"
    >
    <div class="popover-content">
      <slot></slot>
    </div>
    </div>
  </div>
</template>

<script setup>

const promptTop = ref(0)
const promptLeft = ref(0)
const isPopUp=ref(false)
const props = defineProps({
  iconType: {
    type: String,
    required: true,
  },
  promptText:{
    type:String,
    default:'提示词',
  },
  status:{
    type:String,
    default:'prompt',
    validator: (value) => ['prompt', 'popover', 'all'].includes(value) 
  }
})
const handleClick=()=>{
  isPopUp.value=true
}
const clickOutHandler=()=>{
  isPopUp.value=false
}
const iconPath = computed(() => {
  return `/icons/${props.iconType}.svg`
})

const iconRef = ref(null)
const { x, y, isInside } = useMousePosition(iconRef)

watch(isInside, (newVal) => {
  if (newVal) {
    promptTop.value = y.value + 18 + 'px'
    promptLeft.value = x.value + 'px'
  }
})
</script>

<style lang="scss" scoped>
.promptIcon-container {
  height: 100%;
  width: 100%;
  position: relative;
  
  &:hover {
    cursor: pointer;
  }
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  
  .prompt-box {
    position: absolute;
    top: v-bind(promptTop);
    left: v-bind(promptLeft);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    padding: 3px;
    background-color: aqua;
    white-space: nowrap;
    opacity: 0;
    animation: delayedShow 0.3s ease 0.3s forwards;
    .prompt-text{
      font-size: var(--prompt-text);
    }
  }
  .popover{
    padding: 1vw;
    border-radius:5px ;
    background-color: black;
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: black transparent transparent transparent;
    }
  }
}
@keyframes delayedShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>