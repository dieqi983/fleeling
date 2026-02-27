<template>
    <div class="process-bar">
      <div class="process-fill"></div>
      <div class="progress-thumb"></div>
    </div>
</template>

<script setup>
  const props=defineProps({
    currentValue:{
      type:Number,
      default:0,
    },
    maxValue:{
      type:Number,
      default:100,
    }
  })
  const fillWidth=computed(()=>{
    return (props.currentValue/props.maxValue)*100+'%'
  })  
</script>

<style scoped lang="scss">
.process-bar{
  height: 5px;
  width: 400px;
  border-radius: 2px;
  background-color: white;
  position: relative;
  .process-fill{
    background-color: black;
    width: v-bind(fillWidth);
    border-radius: 2px;
    height: 100%;
  }
  .progress-thumb{
    position: absolute;
    width: auto;
    height: 200%;
    aspect-ratio: 1 / 1; 
    background-color: black;
    border-radius: 50%;
    top: -50%;
    transform: translateX(-50%);
    left:v-bind(fillWidth)
  }
}
</style>