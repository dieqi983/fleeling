<template>
  <div class="guide-button-container">
    <GuideBar 
    :naviInfo="props.naviInfo" 
    size="sm" 
    textColor="black" 
    hoverTextColor="white"
    />
  </div>
</template>

<script setup>
const props=defineProps({
  naviInfo:{
    type:Object,
    default:()=>({})
  }
})
</script>

<style lang="scss" scoped>
.guide-button-container{
  height: 40px;
  width: 80px;
  background-color: var(--button-bg-color);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>