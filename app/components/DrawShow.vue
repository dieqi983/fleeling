<template>
  <div class="draw-container">
    <img :src="props.path" alt="">
    <div class="move-bar">
    </div>
  </div>
</template>

<script setup>
const props=defineProps({
  path:{
    type:String,
    required:true,
  }
})

</script>
<style lang="scss" scoped>
.draw-container{
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden; 
  transform: scale(1);
  transition: all 0.3s ease;
  &:hover{
    .move-bar{
      animation: twinkle ease-in-out 0.3s forwards;
    }
    transform: scale(1.1);
  }
  
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index:5;
  }
  
  .move-bar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleX(0); 
    transform-origin: left center; 
    z-index: 10;
    background-color: var(--button-bg-color);
  }
  
  @keyframes twinkle {
    0%{
      transform: scaleX(0);
      transform-origin: left center;
    }
    50%{
      transform: scaleX(1);
      transform-origin: left center;
    }
    51%{
      transform-origin: right center; 
    }
    100%{
      transform: scaleX(0);
      transform-origin: right center;
    }
  }
}
</style>