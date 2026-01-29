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
        <KeyTexts :keyTexts="keyTexts"/>
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
    <div class="footer-container">
      <LoopText text="jkashdjsssssssssssssssssssssssssssssssssssssssssssssssssssssssssahkjdaskaskdhkajsdkasdhkjasdhkajshdkajhdkjahksdk。"/>
    </div>
</div>
</template>

<script setup>
import KeyTexts from '../components/KeyTexts.vue';
import SlideText from '../components/SlideText.vue';
const buttonIsOpen=ref(false)
const keyTexts=['你好，FLEE','这里是FLEE','哈哈哈']
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
    .nav-text-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: fit-content;
      height: 100%;
    }
    .cube-container{
      width: min(80vmin, 700px);
      aspect-ratio: 1 / 1;
      }
    .guidebar-container{
      height: 100%;
      width: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
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
  .footer-container{
    height: 70px;
    width: 100%;
    position: fixed;
    bottom: 10px;
    background: var(--text-color);
    color: white;
  }
}
</style>