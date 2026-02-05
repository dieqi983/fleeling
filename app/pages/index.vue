<template>
  <div class="index-container">
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
    <ExtendButton class="extend-button" v-model="buttonIsOpen">
      <div class="test-dialog"></div>
    </ExtendButton>
    <section class="main-container">
        <div class="text-container">
          <div class="text-show-container">
            <KeyTexts :keyTexts="keyTexts"/>
            <SlideText text="默认嘻嘻哈哈"/>
          </div>
          <div class="text-nav-container">
            <GuideBar/>
          </div>
      </div>
    </section>
    <div class="loop-container">
      <LoopText text="jkashdjsssssssssssssssssssssssssssssssssssssssssssssssssssssssssahkjdaskaskdhkajsdkasdhkjasdhkajshdkajhdkjahksdk。"/>
    </div>
    <section class="show-container">
      <div class="img-container">
        <DrawShow path="https://www.amanation-official.com/wp-content/uploads/2025/12/REINE_img.jpg.webp"/>
      </div>
    </section>
  </div>
</template>

<script setup>
const buttonIsOpen=ref(false)
const keyTexts=['你好，FLEE','这里是FLEE','哈哈哈']
</script>

<style lang="scss" scoped>
.index-container{
  height: 100%;
  width: 100%;
  .extend-button{
    position: fixed;
    top: 5vh;
    right:5vw;
    z-index: 2000;
    .test-dialog{
      height: 500px;
      width: 200px;
    }
  }
  .cube-container{
    width: min(80vmin, 700px);
    aspect-ratio: 1 / 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .main-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .text-container{
      padding:20vh 0 0 3vw ;
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 45vw;
      .text-show-container{
        z-index: 1000;
      }
      .text-nav-container{
        z-index: 1000;
      }
    }
  }
  .loop-container{
    height: 70px;
    width: 100%;
    background: var(--text-color);
    color: white;
    z-index: 100;
    position: relative;
  }
  .show-container{
    position: relative;
    height: 100%;
    width: 100%;
    isolation: isolate;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      opacity: 0.5; 
      pointer-events: none; 
      z-index: -1; 
    }
    .img-container{
      height: 400px;
      width: 600px;
    }
  }
}

</style>