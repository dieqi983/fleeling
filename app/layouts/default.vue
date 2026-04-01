<template>
  <div class="home-container">
    <ExtendButton class="extend-button">
    </ExtendButton>
    <div class="main-box">
      <slot></slot>
    </div>
    <div class="footer-box">
      <div class="music-footer">
        <MusicGlobalBlock/>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .home-container{
    width: 100%;
    height: 100%;
    position: relative;
    .extend-button{
      z-index: var(--z-header);
      position: fixed;
      right: 4vw;
      top: 2vw;
    }
    .main-box{
      height: 100%;
      width: 100%;
    }
    .footer-box{
      position: fixed;
      height: 100px;
      width: 100%;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .music-footer{
        width: 80%;
        height: 100%;
        z-index:var(--z-music-list) ;
      }
    }
  }
</style>