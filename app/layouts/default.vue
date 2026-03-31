<template>
  <div class="home-container">
    <div class="header-box">
        <span class="site-title">FLEELING</span>
        <ExtendButton class="extend-button">
        </ExtendButton>
    </div>
    <div class="main-box">
      <slot></slot>
    </div>
    <div class="footer-box">
      <MusicGlobalBlock/>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .home-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .header-box{
      height: 70px;
      width:100%;
      padding-top:10px ;
      display: flex;
      justify-content: center;
      align-items: center;
      gap:60vw;
      .site-title{
        font-size: 4vw;
        line-height: 4vw;
        display: inline-block;
      }
    }
    .main-box{
      flex: 1;
    }
    .footer-box{
      height: 100px;
      width: 100%;
    }
  }
</style>