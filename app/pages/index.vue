  <template>
    <Carousel 
    @wheel="handleWheel" 
    :currentIndex="currentPage" 
    ref="carouselRef">
      <div class="main-box">
        <div class="cube-box">
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
      <div class="show-box">
        <TopShow :topUsers="topUsers"/>
      </div>
      <div class="other-box"></div>
    </Carousel>
  </template>

  <script setup>
  import debounce from 'lodash/debounce'
  import TopShow from '../components/user/TopShow.vue'
  const currentPage = ref(0)
  const carouselRef = ref(null)
  const totalPages=ref(0)
  const updateTotalPages = () => {
    if (carouselRef.value) {
      totalPages.value = carouselRef.value.totalPages
    }
  }
  // 切换页面
  const switchPage = (newPage) => {
    if(newPage>=0&&newPage<=totalPages.value)
    currentPage.value = newPage
  }
  const debouncedSwitch = debounce((newPage) => {
    switchPage(newPage)
  }, 300)
  // 滚轮事件
  const handleWheel = (e) => {
    e.preventDefault()
    
    if (e.deltaY > 0) {
      // 向下滚动，下一页
      if (currentPage.value < totalPages.value - 1) {
        debouncedSwitch(currentPage.value + 1)
      }
    } else {
      // 向上滚动，上一页
      if (currentPage.value > 0) {
        debouncedSwitch(currentPage.value - 1)
      }
    }
  }

  onMounted(async() => {
    await nextTick()
    updateTotalPages()
  })
  const topUsers=[
    {
      id:1,
      userName:'jiegeng',
      likes:9999,
      masterpiecePath:'/textures/1.jpg'
    },
    {
      id:2,
      userName:'wudi',
      likes:9998,
      masterpiecePath:'/textures/2.jpg'
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
  .main-box{
    height: 100%;
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
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .show-box{
    width: 100%;
    height: 100%;
  }
  .other-box{
    width: 100%;
    height: 100%;
    background-color: pink;
  }
  </style>