<template>
  <div class="top-show-container">
    <div class="info-box">

    </div>
    <div class="work-display-box">
      <UserWorkCarousel :topUsers="props.topUsers"/>
    </div>
  </div>
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
.top-show-container{
  height: 100%;
  width: 100%;
  display: flex;
  .info-box{
    width: 40%;
    height: 100%;
    // background-color: aqua;
  }
  .work-display-box{
    width: 60%;
    height: 100vh;
    background-color: black;
    overflow: hidden;
  }
}
</style>