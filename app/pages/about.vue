<template>
  <div class="about-container">
    <div class="music-list">
      <MusicList :musicList="musicItems" :favorIdSet="favorList"/>
    </div>
    <div class="music-test">
      <MusicController :currentMusic="musicItems[0]" :favorIdSet="favorList"/>
    </div>
  </div>
</template>

<script setup>
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
.about-container{
  height: 100%;
  width: 100%;
  .music-list{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 600px;
    width: 400px;
  }
  .music-test{
    height: 100px;
    width: 100%;
    position: fixed;
    bottom: 0;
  } 
}
</style>