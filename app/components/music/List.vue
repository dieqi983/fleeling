<template>
  <div class="music-list-container">
    <div 
    class="item-box"
    v-for="music in props.musicList"
    :key="music.id"
    >
      <MusicItem 
      :musicItem="music"  
      @selectMusicItem="handleSelect"
      :isSelected="selectMusicId===music.id"
      :isPlay="props.curPlayMusicId===music.id"
      @dblclick="musicPlay(music.id)"
      :showType="props.showType"
      >
        <div class="control-box">
          <div class="like-icon-box">
            <PromptIcon 
            :iconType="curMusicIsFavor(music.id) ? 'favorited' : 'favorite'"
            @click.stop="toggleFavor(music.id)"
            />
          </div>
          <div class="toTop-icon-box">
            <PromptIcon 
            iconType="toTop"
            @click.stop="toNextPlay(music.id)"
            />
          </div>
          <div class="download-icon-box">
            <PromptIcon
            iconType="download"
            @click.stop="downLoadMusic(music.id)"
            />
          </div>
        </div>
      </MusicItem>
    </div>
  </div>
</template>

<script setup>

const props=defineProps({
  musicList:{
    type:Array,
    default:()=>[],
  },
  curPlayMusicId:{
    type:Number,
    default:0,
  },
  favorIdSet:{
    type:Set,
    default:()=>new Set([])
  },
  showType:{
    type:String,
    default:'playListItem',
    validator:(value)=>{
      return ['playListItem','showListItem'].includes(value)
    }
  }
})
const emit=defineEmits(['listToggleFavor','toNextPlay','downLoadMusic','musicPlay'])
//处理收藏逻辑
const curMusicIsFavor=(musicId)=>{
  return props.favorIdSet.has(musicId)
}
const toggleFavor=(musicId)=>{
  const value={}
  if (curMusicIsFavor(musicId)){
    value.type='delete'
    value.musicId=musicId
  }
  else{
    value.type='add'
    value.musicId=musicId
  }
  emit('listToggleFavor',value)
}
//处理选中音乐项逻辑
const selectMusicId=ref(null)
const handleSelect=(selectedId)=>{
  selectMusicId.value = selectedId
}
//音乐置顶
const toNextPlay=(musicId)=>{
  emit('toNextPlay',musicId)
}
//音乐资源下载
const downLoadMusic=(musicId)=>{
  emit('downLoadMusic',musicId)
}
//双击播放音乐
const musicPlay=(musicId)=>{
  emit('musicPlay',musicId)
}
</script>

<style lang="scss" scoped>
  .music-list-container{
    height: 100%;
    width: 100%;
    display: flex;
    user-select: none;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
    gap: 2vh;
    border-radius: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    .item-box{
      height: 70px;
      width: 100%;
    }
    .control-box{
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: right;
      align-items: center;
      gap:20px;
      div{
        height: 25px;
        width: 25px;
      }
    }
  }
</style>