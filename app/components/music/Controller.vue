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
      </div>
    </div>
    <div class="music-control-container">
      <div class="widget-container"></div>
      <div class="process-bar-container">
          <span class="time-text">{{ formatTime(currentValue) }}</span>
          <div class="progress-wrapper">
            <ProcessBar 
              v-model="currentValue"
              :maxValue="120"
              size="sm"
            />
          </div>
          <span class="time-text">{{ formatTime(120) }}</span>
      </div>
    </div>
    <div class="other-handle-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProcessBar from '../ProcessBar.vue';

const currentValue = ref(120)

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
</script>

<style lang="scss" scoped>
.music-controller {
  width: 100%;
  height: 100%;
  display: flex;
  
  .music-info-container {
    height: 100%;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    
    .pic-container {
      width: auto;
      height: 80%; 
      aspect-ratio: 1 / 1; 
    }
    
    .music-text-info {
      display: flex;
      flex-direction: column;
      max-width: 50%;
      height: 80%;
      justify-content: center; 
      
      span {
        white-space: nowrap;     
        overflow: hidden;         
        text-overflow: ellipsis;  
        width: 100%;              
        display: block; 
      }
      
      .music-name {
        font-size: var(--text-size-md);
      }
      
      .singer-name {
        font-size: var(--text-size-sm);
      }
    }
  }
  
  .music-control-container {
    height: 100%;
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .widget-container {
      height: 60%;
      width: 100%;  
    }
    
    .process-bar-container {
      height: 40%;
      width: 80%;
      display: flex;
      gap: 12px;
      justify-content: center;
      align-items: center; 
      
      .time-text {
        display: block;
        text-align: center;
        font-size: 14px;
        color: #666;
        min-width: 45px; 
      }
      
      .progress-wrapper {
        flex: 1; 
        display: flex;
        align-items: center; 
        height: 100%;
      }
    }
  }
  
  .other-handle-container {
    height: 100%;
    width: 25%;
  }
}
</style>