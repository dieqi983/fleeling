<template>
  <div class="music-controller">
    <audio src=""/>
    <div class="music-info-container">
      <div class="pic-container">
        <Profile path="/textures/5.jpg"/>
      </div>
      <div class="music-text-info">
        <span class="music-name">演员</span>
        <span class="singer-name">--jiegeng</span>
        <span></span>
      </div>
    </div>
    <div class="music-control-container">
      <ProcessBar :currentValue="100" :maxValue="100"/>
    </div>
    <div class="other-handle-container"></div>
  </div>
</template>

<script setup>
import ProcessBar from '../ProcessBar.vue';


</script>

<style lang="scss" scoped>
.music-controller{
  width: 100%;
  height: 100%;
  display: flex;
  .music-info-container{
    height: 100%;
    width: 20%;
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    .pic-container{
      width: auto;
      height: 80%; 
      aspect-ratio: 1 / 1; 
    }
    .music-text-info{
      display: flex;
      flex-direction: column;
      max-width: 50%;
      height: 80%;
      span {
        white-space: nowrap;     
        overflow: hidden;         
        text-overflow: ellipsis;  
        width: 100%;              
        display: block; 
      }
      .music-name{
        font-size:var(--text-size-md) ;
      }
      .singer-name{
        font-size: var(--text-size-sm);
      }

    }
  }
  
  .music-control-container{
    height: 100%;
    width: 55%;
  }
  
  .other-handle-container{
    height: 100%;
    width: 25%;
    background-color: pink;
  }
}
</style>