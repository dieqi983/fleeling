  <template>
    <div class="index-container">
      <div class="main-box">
        <div class="cube-box">
          <HomeCube
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
              z:8,
            }"
          />
        </div>
        <div class="text-show-container">
          <SlideText text="默认嘻嘻哈哈"/>
        </div>
        <div class="text-nav-container">
          <GuideBar/>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  
  const topUsers=[
    {
      id:1,
      userName:'jiegeng',
      likes:9999,
      masterpiecePath:'/textures/2.jpg'
    },
    {
      id:2,
      userName:'wudi',
      likes:9998,
      masterpiecePath:'/textures/7.jpg'
    },
    {
      id:3,
      userName:'zzhh',
      likes:9997,
      masterpiecePath:'/textures/3.jpg'
    },
    {
      id:4,
      userName:'dieqi',
      likes:9996,
      masterpiecePath:'/textures/4.jpg'
    }
  ]
  </script>

  <style lang="scss" scoped>
  // 保持你原有的样式不变
  .index-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    .main-box{
      height: 100vh;
      width: 100%;
      min-width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 45vw;
      position: relative;
      .cube-box{
        width: min(44vw, 600px);
        aspect-ratio: 1 / 1;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }

  </style>