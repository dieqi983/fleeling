<template>
  <div class="about-container">
    <h1>about</h1>
    <div class="icontest">
      <PromptIcon iconType="like" status="all">
        <template #default>
          <div class="content-test"></div>
        </template>
      </PromptIcon>
    </div>
    <div class="music-test">
      <MusicController/>
    </div>
  </div>
</template>

<script setup>
import PromptIcon from '../components/PromptIcon.vue';

</script>

<style lang="scss" scoped>
.about-container{
  height: 100%;
  width: 100%;
  .icontest{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30px;
    width: 30px;
    background-color: orange;
    .content-test{
      height: 100px;
      width: 30px;
      background-color: aliceblue;
    }
  }
  .music-test{
    height: 100px;
    width: 100%;
    position: fixed;
    bottom: 0;
  } 
}
</style>