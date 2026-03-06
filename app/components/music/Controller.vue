<template>
  <div class="music-controller">
    <audio 
    ref="audioRef" 
    :src="currentPlayMusic"
    @ended="onEnded"
    @timeupdate="onTimeupdate"
    @play="isPlaying=true"
    @pause="isPlaying=false"
    />
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
      <div class="widget-container">
        <div class="playmode-container">
          <PromptIcon :iconType="playMode" status="all">
            <template #default>
              <div class="mode-option-container">
                  <IconText 
                  icon-type="arrow-right" 
                  text="循环播放"
                  @click="playMode='oneloop'"
                  />
                  <IconText 
                  icon-type="arrow-right" 
                  text="列表播放"
                  @click="playMode='listloop'"
                  />
              </div>
            </template>
          </PromptIcon>
        </div>
        <div class="main-control-container">
          <div class="previous">
            <PromptIcon iconType="previous" @click="turnPrevious"/>
          </div>
          <div class="pause">
            <PromptIcon :iconType="isPlaying?'pause':'play'" @click="controlPlay"/>
          </div>
          <div class="next">
            <PromptIcon iconType="next" @click="turnNext"/>
          </div>
        </div>
        <div class="volume-container">
          <PromptIcon iconType="volume" status="all">
            <template #default>
              <div class="volume-process-bar">
                <div class="volume-text">
                  <span>{{currentVolume}}%</span>
                </div>
                <ProcessBar 
                size="sm" 
                barColor="white" 
                fillColor="black"
                :maxValue="100"
                v-model="currentVolume"
                />
              </div>
            </template>
          </PromptIcon>
        </div>
      </div>
      <div class="process-bar-container">
          <span class="time-text">{{ formatTime(currentTime) }}</span>
          <div class="progress-wrapper">
            <ProcessBar 
              v-model="currentTime"
              :maxValue="duration"
              size="sm"
              @drag-start="onDragStart"
              @drag-end="onDragEnd"
              @clickBar="clickBarHandler"
            />
          </div>
          <span class="time-text">{{formatTime(duration)}}</span>
      </div>
    </div>
    <div class="other-handle-container">
      <div class="music-favorite">
        <PromptIcon 
        :iconType="isFavorited?'favorited':'favorite'" 
        status="prompt"
        @click="favoriteHandler"
        />
      </div>
      <div class="music-list">
        <PromptIcon iconType="list" status="prompt"/>
      </div>
      <div class="music-user">
        <PromptIcon iconType="users" status="prompt"/>
      </div>
    </div>
  </div>
</template>

<script setup>

const audioRef=ref(null)
const emit=defineEmits(['favoriteChange'])
const props=defineProps({
  musicList:{
    type:Array,
    default:()=>[],
  },
  //用户已收藏集合（采用集合储存可以高效查询）
  favoritedSet:{
    type:Set,
    default:()=>new Set(),
  }
})
const currentMusicIndex=ref(0)
const isPlaying=ref(false)
//播放方式状态
const playMode=ref('listloop')
//音量状态
const currentVolume=ref(0)
//判断是否初始化volume
let isFirstVolumeChange = true
const currentPlayMusic=computed(()=>{
  return props.musicList[currentMusicIndex.value].url
})
const controlPlay=async ()=>{
  const audio = audioRef.value
  try {
    if (audio.paused) {
      await audio.play()
    } else {
      audio.pause()
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('播放失败:', error)
    }
  }
}
const safePlay=()=>{
  audioRef.value.addEventListener('canplay',()=>{
    audioRef.value.play()
  },{ once: true })
}
const switchMusic = async (direction) => {
  if (!props.musicList || props.musicList.length === 0) return
  
  const total = props.musicList.length
  let newIndex
  
  if (direction === 'next') {
    newIndex = (currentMusicIndex.value + 1) % total
  } else if (direction === 'prev') {
    newIndex = (currentMusicIndex.value - 1 + total) % total
  }
  if (newIndex !== currentMusicIndex.value) {
    currentMusicIndex.value = newIndex
    await nextTick()
    safePlay()
  }
}
const onEnded= async()=>{
  isPlaying.value=false
  if(playMode.value==='listloop'){
    switchMusic('next')
  }
  if(playMode.value==='oneloop'){
    audioRef.value.currentTime=0
    await nextTick()
    safePlay()
  }
}
//控制上一首，下一首
const turnPrevious=()=>{switchMusic('prev')}
const turnNext=()=>{switchMusic('next')}
//音乐进度条逻辑
const currentTime = ref(0)
const duration = ref(0)
const isDragging=ref(false)
const onTimeupdate=(e)=>{
  if(!isDragging.value){
    currentTime.value = e.target.currentTime
  }
}
const clickBarHandler=(e)=>{
  if(!isDragging.value){
    audioRef.value.currentTime=e
  }
}
const onDragStart = () => {
  isDragging.value = true
}

const onDragEnd = async(value) => {
  isDragging.value = false
  
  const audio = audioRef.value
  if (audio) {
    audio.currentTime = value
    await nextTick()
    audio.play()
  }
}
//处理音量
watch(currentVolume,(newValue)=>{
  if(isFirstVolumeChange){
    isFirstVolumeChange=false
    return
  }
  audioRef.value.volume=newValue/100
})
//处理音乐收藏逻辑
const isFavorited=ref(false)
const musicId=computed(()=>{
  return props.musicList[currentMusicIndex.value].id
})
watch(musicId,(newMusicId)=>{
  isFavorited.value=props.favoritedSet.has(newMusicId)
},{immediate:true})

const favoriteHandler=()=>{
  const oldState=isFavorited.value
  isFavorited.value=!isFavorited.value
  return new Promise((resolve, reject)=>{
    emit('favoriteChange',{
      musicId: musicId.value,
      curFavorState: isFavorited.value,
      resolve, 
      reject    
    })
  })
  .catch(()=>{
    isFavorited.value=oldState 
  })
}
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
onMounted(() => {
  const audio = audioRef.value
  if (audio) {
    currentVolume.value=audio.volume*100
    // 如果已经有 duration，直接获取
    if (audio.duration) {
      duration.value = audio.duration
    }
    // 同时监听事件（处理网络加载的情况）
    audio.addEventListener('loadedmetadata', (e) => {
      duration.value = e.target.duration
    })
  }
})
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
      height: 40%;
      width: 50%;  
      display: flex;
      justify-content: space-between;
      .playmode-container{
        width: 30px;
        height: 30px;
        .mode-option-container{
          display: flex;
          flex-direction: column ;
          gap: 5px;
        }
      }
      .main-control-container{
        display: flex;
        gap: 20px;
        div{
          width: 30px;
          height: 30px;
        }
      }
      .volume-container{
        width: 30px;
        height: 30px;
        .volume-process-bar{
          width: 15vw;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
          .volume-text{
            width: 4vw;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5vw;
    div{
      height: 30px;
      width: 30px;
      
    }
  }
}
</style>