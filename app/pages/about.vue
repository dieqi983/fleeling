<template>
  <div class="about-container">
    <h1>about</h1>
    <div class="music-test">
      <musicController/>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.about-container{
  height: 100%;
  width: 100%;
  .music-test{
    height: 100px;
    width: 100%;
    background-color: orange;
    position: fixed;
    bottom: 0;
  }
}
</style>