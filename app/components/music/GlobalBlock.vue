<template>
  <div class="music-global-block">
    <div class="control-box">
      <MusicController/>
    </div>
    <div class="list-box">
      <MusicList/>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.music-global-block{
  width: 100%;
  height: 100%;
  position: relative;
  .control-box{
    height: 100%;
    width: 100%;
  }
  .list-box{
    height: 600px;
    width: 400px;
    position: absolute;
  }
}
</style>