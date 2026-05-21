<template>
  <div class="music-global-block">
    <div class="control-box">
      <MusicController
      :currentMusic="curPlayMusic" 
      :favorIdSet="favorList"
      @show-playlist="openListShow"
      />
    </div>
    <AnimatedModal v-model:open="islistOpen">
      <AnimatedModalBody :lockScroll="false" :showClose="false" class="w-1/2 h-2/3">
          <MusicPlayList/>
      </AnimatedModalBody>
    </AnimatedModal>
  </div>
</template>

<script setup>

const test=ref(true)
const islistOpen=ref(false)
const openListShow=()=>{
  islistOpen.value=true
}
const favorList=ref(new Set([1,2]))
const musicStore = useMusicStore()
const { curPlayMusic } = storeToRefs(musicStore)  

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
