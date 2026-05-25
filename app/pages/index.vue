<template>
  <div class="flex flex-col w-full">
    <div class="h-screen w-full min-w-full flex justify-center items-center gap-[40vw] relative">
      <div class=" w-150 2xl:w-180 aspect-square fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
            height: 4,
            width: 4,
            depth: 4,
          }"
          :cameraPositon="{
            x: 0,
            y: 0,
            z: 8,
          }"
        />
      </div>
    <div class="w-1/2 h-full flex pl-55">
      <div class="flex justify-center flex-col gap-5 2xl:gap-8">
        <HomeBoxReveal color="rgb(241, 121, 1)">
          <p class="text-lg ">
            welcome to
            <br>
          </p>
        </HomeBoxReveal>
        <HomeBoxReveal color="rgb(241, 121, 1)">
          <p class="text-7xl">
            Fleeing<span class="text-(--button-bg-color)">.</span>
          </p> 
        </HomeBoxReveal>

        <HomeBoxReveal
          color="rgb(241, 121, 1)"
          :duration="0.8"
        >
          <h2 class="mt-[.5rem] text-lg ">
            tips：Showcase users is
            <span class="text-(--button-bg-color)">
              Top 6
            </span>
          </h2>
        </HomeBoxReveal>
        <HomeBoxReveal
          color="rgb(241, 121, 1)"
          :duration="0.8"
        >
          <h2 class="mt-[.5rem] text-lg">
            you can click to enter 
            <span class="text-(--button-bg-color)">
              user's homepage
            </span>
          </h2>
        </HomeBoxReveal>
      </div>
      </div>
      <div class="w-1/2 h-full flex justify-center items-center pr-40 flex-col gap-20 pl-10">
        <div class=" text-lg pr-40">
          <HomeBoxReveal
            color="rgb(241, 121, 1)"
          >
            <span class="whitespace-nowrap">tips:only show top6</span>
          </HomeBoxReveal>
        </div>
        <div class="flex items-center gap-3">
          <SlideText text="jiegeng" />
          <div class="w-6 h-6">
            <img src="/icons/navi.svg" alt="">
          </div>
        </div>
        <div class=" text-lg pr-40">
          <HomeBoxReveal
          color="rgb(241, 121, 1)"
          >
            <span class="whitespace-nowrap">his favorate have:465</span>
          </HomeBoxReveal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const musicItems = [
  {
    id: 1,
    url: '/mp3/bird.mp3',
    pic: '/textures/1.jpg',
    singer: 'jiegeng',
    name: 'bird',
    duration: 180
  },
  {
    id: 2,
    url: '/mp3/bird.mp3',
    pic: '/textures/2.jpg',
    singer: 'dieqi',
    name: 'depature',
    duration: 180
  },
  {
    id: 3,
    url: '/mp3/bird.mp3',
    pic: '/textures/7.jpg',
    singer: 'wudi',
    name: 'klzhisahng',
    duration: 180
  },
  {
    id: 4,
    url: '/mp3/bird.mp3',
    pic: '/textures/3.jpg',
    singer: 'oli',
    name: 'bird',
    duration: 180
  },
  {
    id: 5,
    url: '/mp3/bird.mp3',
    pic: '/textures/3.jpg',
    singer: 'oli',
    name: 'bird',
    duration: 180
  },
  {
    id: 6,
    url: '/mp3/bird.mp3',
    pic: '/textures/3.jpg',
    singer: 'oli',
    name: 'bird',
    duration: 180
  },
  {
    id: 7,
    url: '/mp3/bird.mp3',
    pic: '/textures/3.jpg',
    singer: 'oli',
    name: 'bird',
    duration: 180
  },
  {
    id: 8,
    url: '/mp3/bird.mp3',
    pic: '/textures/3.jpg',
    singer: 'oli',
    name: 'bird',
    duration: 180
  },
  {
    id: 9,
    url: '/mp3/bird.mp3',
    pic: '/textures/3.jpg',
    singer: 'oli',
    name: 'bird',
    duration: 180
  },
  {
    id: 10,
    url: '/mp3/bird.mp3',
    pic: '/textures/3.jpg',
    singer: 'oli',
    name: 'bird',
    duration: 180
  }
]

const topUsers = [
  {
    id: 1,
    userName: 'jiegeng',
    likes: 9999,
    masterpiecePath: '/textures/2.jpg'
  },
  {
    id: 2,
    userName: 'wudi',
    likes: 9998,
    masterpiecePath: '/textures/7.jpg'
  },
  {
    id: 3,
    userName: 'zzhh',
    likes: 9997,
    masterpiecePath: '/textures/3.jpg'
  },
  {
    id: 4,
    userName: 'dieqi',
    likes: 9996,
    masterpiecePath: '/textures/4.jpg'
  }
]

const { changePlayList } = useMusicStore()

onMounted(() => {
  changePlayList(musicItems, 2)
})
</script>

<style scoped>

</style>