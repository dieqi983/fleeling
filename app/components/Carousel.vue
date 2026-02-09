<template>
  <div class="show-container">
    <div class="imgs-container">
      <div class="img-box">
        <img src="/textures/2.jpg" alt="">
      </div>
      <div class="img-box">
        <img src="/textures/3.jpg" alt="">
      </div>
      <div class="img-box">
        <img src="/textures/4.jpg" alt="">
      </div>
    </div>
  </div>  
</template>
<script setup>
  const props=defineProps({
    imgs:{
      type:Array,
      default:()=>[],
    }
  })
</script>
<style lang="scss" scoped>
.show-container {
  height: 100%; 
  width: 100%;
  overflow: hidden;
  .imgs-container {
    display: flex;
    height: 100%;
    width: 100%;
    
    .img-box {
      flex: 0 0 100%;
      height: 100%;
      box-sizing: border-box;
      border: solid black 1px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>