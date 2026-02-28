<template>
  <div class="index-container">
      <div class="site-title-box" ref="siteTitleRef">
        <span class="site-title">FLEELING</span>
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
    <ExtendButton class="extend-button" v-model="buttonIsOpen">
      <div class="test-dialog"></div>
    </ExtendButton>
    <div class="music-footer">
      <MusicController/>
    </div>
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
    <div class="loop-container" ref="loopContainer">
      <LoopText text="jkashdjsssssssssssssssssssssssssssssssssssssssssssssssssssssssssahkjdaskaskdhkajsdkasdhkjasdhkajshdkajhdkjahksdk。"/>
    </div>
    <section class="show-container" ref="containerRef">
      <div class="show-scroll-container" ref="scrollContentRef">
        <div
          v-for="(item,index) in showInfo"
          :key="index"
        >
          <HomeShowContainer 
          :path="item.path"
          :userInfo="item.userInfo"
          :drawInfo="item.drawInfo"
          />
        </div>
      </div>
    </section>
    <section class="footer-container">

    </section>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const buttonIsOpen = ref(false)
const containerRef = ref(null)
const scrollContentRef = ref(null)
const siteTitleRef = ref(null)
const loopContainer = ref(null)

let ctx

const horizontalScroll = () => {
  const container = containerRef.value
  const scrollContent = scrollContentRef.value
  const slideCount = scrollContent.children.length
  
  gsap.set(scrollContent, {
    width: `${slideCount * 100}vw`
  })
  
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

const titleScrollAnimation = () => {
  if (!loopContainer.value || !siteTitleRef.value) return

  gsap.to(siteTitleRef.value, {
    scale: 0, 
    ease: 'power2.out',
    scrollTrigger: {
      trigger: loopContainer.value,
      start: 'top 50%', 
      end: 'top 0%', 
      scrub: 1,        
      toggleActions: 'play reverse play reverse', 
    }
  })
}

onMounted(async() => {
  gsap.registerPlugin(ScrollTrigger)
  await nextTick()
  

  ctx = gsap.context(() => {
    horizontalScroll()
    titleScrollAnimation()
  })
})


onUnmounted(() => {
  if (ctx) {
    ctx.revert() 
  }
})
const showInfo=ref([
  {
    path:'/',
    userInfo:{
      userName:'蝶祈',
      likeTotal:20,
    },
    drawInfo:[
      {
        path:'/textures/1.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/2.jpg',
        descript:'我是无敌joker',
      },
      {
        path:'/textures/3.jpg',
        descript:'今天是个好天气',
      },
      {
        path:'/textures/4.jpg',
        descript:'好想放假啊',
      }
    ]
  },
  {
    path:'/',
    userInfo:{
      userName:'蝶祈',
      likeTotal:20,
    },
    drawInfo:[
      {
        path:'/textures/1.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/2.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/3.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/4.jpg',
        descript:'新时代的帆船不枉回开',
      }
    ]
  },
  {
    path:'/',
    userInfo:{
      userName:'蝶祈',
      likeTotal:20,
    },
    drawInfo:[
      {
        path:'/textures/1.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/2.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/3.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/4.jpg',
        descript:'新时代的帆船不枉回开',
      }
    ]
  },
  {
    path:'/',
    userInfo:{
      userName:'蝶祈',
      likeTotal:20,
    },
    drawInfo:[
      {
        path:'/textures/1.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/2.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/3.jpg',
        descript:'新时代的帆船不枉回开',
      },
      {
        path:'/textures/4.jpg',
        descript:'新时代的帆船不枉回开',
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.index-container{
  height: 100%;
  width: 100%;
  position: absolute;
  .site-title-box{
    position: fixed;
    z-index: 2000;
    top: 6vh; 
    left: 3vw;
    line-height: 0.5; 
  }
  .site-title{
    font-size: clamp(50px, 10vw, 100px);
  }
  .extend-button{
    position: fixed;
    top: 5vh;
    right:5vw;
    z-index: 2000;
    line-height: 1;

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
  .music-footer{
    height: 100px;
    width: 100%;
    position: fixed;
    bottom: 0;
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