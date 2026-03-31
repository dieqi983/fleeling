<template>
  <Carousel 
  direction="vertical"
  >
    <img 
    v-for="topUser in props.topUsers"
    :src="topUser.masterpiecePath" 
    alt=""
    :key="topUser.id"
    >
  </Carousel>
</template>

<script setup>
const props=defineProps({
  topUsers:{
    type:Array,
    default:()=>[],
  }
})
</script>

<style lang="scss" scoped>
img{
  height: 100%;
  width: 100%;
}
</style>