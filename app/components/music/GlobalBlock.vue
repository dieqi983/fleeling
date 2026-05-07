<template>
  <div class="music-global-block">
    <div class="control-box">
      <MusicController
      :currentMusic="musicItems[0]" 
      :favorIdSet="favorList"
      @show-playlist="openListShow"
      />
    </div>
    <AnimatedModal v-model:open="islistOpen">
      <AnimatedModalBody :showClose="false" class="w-1/2">
            <div class=" w-full h-125 ">
              <MusicList 
              :musicList="musicItems" 
              :favorIdSet="favorList"
              />
            </div>

      </AnimatedModalBody>
    </AnimatedModal>
  </div>
</template>

<script setup>
const islistOpen=ref(false)
const openListShow=()=>{
  islistOpen.value=true
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
  border-radius: 10px;
  background-color: var(--text-un-color);
  z-index: var(--z-music-container);
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
  .control-box{
    height: 100%;
    width: 100%;
  }
}
</style>