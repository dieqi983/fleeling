<template>
  <div class="show-container">
    <div class="show-inside">
      <div class="carousel-container">
        <Carousel/>
      </div>
    </div>
    <div class="img-text-container">
      <div class="img-container">
        <DrawShow/>
      </div>
      <span class="img-descript-text"></span>
    </div>
  </div>
</template>

<script setup>
  const props=defineProps({
    userInfo:{
      type:Object,
      default:()=>({
        userName:'',
        Email:'',
      })
    },
    drawInfo:{
      type:Object,
      default:()=>({
        drawPath:'',
        drawIntroduction:'',
      })
    }
  })
</script>

<style lang="scss" scoped>
.show-container{
  height: 100%;
  width: 100%;
  display: flex;
  .show-inside{
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    .carousel-container{
      height: 40%;
      width: 100%;
      transform: translateX(3vw);
    }
  }
  .img-text-container{
  flex: 1;
  height: 100%; 
  min-height: 500px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img-container{
    height: 70%;
    width: 70%;
    border: pink solid 1px;
  }
  }
}
</style>