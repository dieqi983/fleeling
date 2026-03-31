<template>
  <div class="music-global-block">
    <div class="control-box">
      <MusicController
      :currentMusic="musicItems[0]" 
      :favorIdSet="favorList"
      @show-playlist="reverseListShow"
      />
    </div>
    <div class="list-box" v-show="islistOpen">
      <MusicList 
      :musicList="musicItems" 
      :favorIdSet="favorList"
      v-click-outside="closeShowList"
      />
    </div>
  </div>
</template>

<script setup>
const islistOpen=ref(false)
const reverseListShow=()=>{
  islistOpen.value=!islistOpen.value
}
const closeShowList=()=>{
  islistOpen.value=false
}
const favorList=ref(new Set([1,2]))
const musicItems = Array.from({ length:30}, () => (
  {
    id:1,
    url:'/mp3/bird.mp3',
    pic:'/textures/1.jpg',
    singer:'jiegeng',
    name:'bird',
    duration:180
  }
))
</script>

<style lang="scss" scoped>
.music-global-block{
  background-color: var(--text-un-color);
  z-index: var(--z-music-container);
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  .control-box{
    height: 100%;
    width: 100%;
  }
  .list-box{
    overflow: hidden;
    height: 83vh;
    width: 400px;
    position: absolute;
    bottom: 110%;
    right: 2vw;
    background-color: var(--text-un-color);
    border-radius: 10px;
    z-index: var(--z-music-list);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
}
</style>