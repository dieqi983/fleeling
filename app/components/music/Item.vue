<template>
  <div
  :class="['item-container', {'selected': props.isSelected},{'play':props.isPlay}]"
  @click="selectItem"
  >
    <div class="info-box">
      <div class="music-cover">
        <Profile :path="props.musicItem.pic?props.musicItem.pic:'/textures/1.jpg'"/>
      </div>
      <div class="music-info">
        <span class="music-name">{{props.musicItem.name}}</span>
        <span class="music-singer">{{props.musicItem.singer}}</span>
      </div>
    </div>
    <div class="time-box" v-if="isShowTime">
      <span class="music-time">{{formatTime(props.musicItem.duration)}}</span>
    </div>
    <div class="operation-box">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  const props=defineProps({
    musicItem:{
      type:Object,
      default:()=>({})
    },
    isPlay:{
      type:Boolean,
      default:false
    },
    isSelected:{
      type:Boolean,
      default:false
    },
    showType:{
      type:String,
      default:'playListItem',
      validator:(value)=>{
        return ['playListItem','showListItem'].includes(value)
      }
    }
  })
  const emit=defineEmits(['selectMusicItem'])
  const selectItem=()=>{
    emit('selectMusicItem',props.musicItem.id)
  }
  const isShowTime=computed(()=>{
    return props.showType==='showListItem'
  })
</script>

<style scoped lang="scss">
  .item-container{
    height: 100%;
    width: 100%;
    display: flex;
    &.play{
      .music-cover {
        animation: rotate 2s linear infinite;
      }
    }
    &:hover, &.selected{
      .operation-box{
        opacity: 1;
      }
      background-color: var(--button-bg-color);
    }
    .info-box{
      width: 40%;
      height:100%;
      display: flex;
      justify-content: left;
      align-items: center;
      gap: 1vw;
      padding-left:2vw ;
      .music-cover{
        width: auto;
        height: 80%; 
        aspect-ratio: 1 / 1; 
      }
      span {
        white-space: nowrap;     
        overflow: hidden;         
        text-overflow: ellipsis;  
        width: 100%;              
        display: block; 
      }
      .music-name{
        font-size: var(--text-size-sm);
      }
      .music-singer{
        font-size:var(--text-size-sm);
        color: rgb(154, 156, 157);
      }
    }
    .time-box{
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .music-time{
        font-size:var(--text-size-sm);
        color: rgb(154, 156, 157);
      }
    }
    .operation-box{
      flex: 1;
      opacity: 0;
      padding-right:2vw ;
      transition: all 0.5s ease-in-out;
    }
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
</style>