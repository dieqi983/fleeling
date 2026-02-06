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
    <section class="show-container" ref="containerRef">
      <div class="show-scroll-container" ref="scrollContentRef">
        <div>
          <HomeShowContainer/>
        </div>
        <div style="background-color: aqua;"></div>
        <div></div>
      </div>
    </section>
    <section class="footer-container">

    </section>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
const buttonIsOpen=ref(false)
const containerRef=ref(null)
const scrollContentRef=ref(null)
const horizontalScroll=()=>{
  const container=containerRef.value
  const scrollContent=scrollContentRef.value
  const slideCount=scrollContent.children.length
    // 设置总宽度
  gsap.set(scrollContent, {
    width: `${slideCount * 100}vw`
  })
  
  // 创建水平滚动
  gsap.to(scrollContent, {
    x: () => -((slideCount - 1) * 100) + 'vw',
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollContent.clientWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  })
}
onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)
  await nextTick()
  horizontalScroll()
})
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
      padding:0 0 0 3vw ;
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
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  .show-scroll-container{
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
    height: 100%; 
    display: flex; 
    position: relative;
    flex-shrink: 0;
    
    & > div{
      flex: 0 0 100vw;
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
      }
    }
  }
  .footer-container{
    height: 100%;
    width: 100%;
  }
}

</style>