<template>
  <div class="index-container">
    <div class="button-box">
      <extend-button
      v-model="buttonIsOpen"
      >
      <div 
      class="test-list"
      >
        <span>winter</span>
        <span>sumer</span>
        <span>spring</span>
        <span>autamn</span>
      </div>
      </extend-button>
    </div>
    <div class="center-container">
      <div class="nav-text-container">
        <div class="text">
          <p>sasahskjask</p>
          <p>sjdhsjkdk</p>
          <p>dkaldjaklsj</p>
          <p>dkaldjaklsj</p>
          <p>dkaldjaklsj</p>
          <p>dkaldjaklsj</p>
        </div>
        <SlideText text="默认嘻嘻哈哈"/>
      </div>
      <div class="cube-container">
        <Cube
        :textures="[
          '/textures/1.jpg',
          '/textures/2.jpg',
          '/textures/3.jpg',
          '/textures/4.jpg',
          '/textures/5.jpg',
          '/textures/6.jpg',
        ]"
        :cubeSize="{
          height:4,
          width:4,
          depth:4,
        }"
        :cameraPositon="{
          x:0,
          y:0,
          z:7.5,
        }"
        />
      </div>
      <div class="guidebar-container">
        <GuideBar/>
      </div>
    </div>

</div>
</template>

<script setup>
import SlideText from '../components/SlideText.vue';


const buttonIsOpen=ref(false)
const closeButton=()=>{
  buttonIsOpen.value=false
}

</script>

<style lang="scss" scoped>
.index-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .center-container{
    height: 80vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    // border: 1px solid pink;
    .nav-text-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: fit-content;
      height: 100%;
      // background-color: green;
    }
    .cube-container{
      // border: black solid 1px;
      width: min(80vmin, 700px);
      aspect-ratio: 1 / 1;
      }
    .guide-box{
        height: 50px;
        width:150px;
      }
  }
  .button-box{
  position: fixed;
  top: 5vh;
  right:5vw;
  z-index: 2000;
    .test-list{
      color: white;
      display: flex;
      font-size: 30px;
      padding: 10px;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }
}
</style>