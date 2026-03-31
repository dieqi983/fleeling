<template>
  <div class="music-controller">
    <audio 
      ref="audioRef" 
      :src="currentMusic?.url"
      @ended="onEnded"
      @timeupdate="onTimeupdate"
      @play="isPlaying=true"
      @pause="isPlaying=false"
      @loadedmetadata="onLoadedMetadata"
    />
    
    <div class="music-info-container">
      <div class="pic-container">
        <Profile :path="currentMusic?.cover || '/textures/5.jpg'"/>
      </div>
      <div class="music-text-info">
        <span class="music-name">{{ currentMusic?.name || '未知歌曲' }}</span>
        <span class="singer-name">{{ currentMusic?.singer || '--未知歌手' }}</span>
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
                  text="单曲循环"
                  @click="setPlayMode('oneloop')"
                />
                <IconText 
                  icon-type="arrow-right" 
                  text="顺序播放"
                  @click="setPlayMode('listloop')"
                />
              </div>
            </template>
          </PromptIcon>
        </div>
        
        <div class="main-control-container">
          <div class="previous">
            <PromptIcon iconType="previous" @click="onPrevious"/>
          </div>
          <div class="pause">
            <PromptIcon :iconType="isPlaying ? 'pause' : 'play'" @click="togglePlay"/>
          </div>
          <div class="next">
            <PromptIcon iconType="next" @click="onNext"/>
          </div>
        </div>
        
        <div class="volume-container">
          <PromptIcon iconType="volume" status="all">
            <template #default>
              <div class="volume-process-bar">
                <div class="volume-text">
                  <span>{{ currentVolume }}%</span>
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
            @clickBar="onProgressClick"
          />
        </div>
        <span class="time-text">{{ formatTime(duration) }}</span>
      </div>
    </div>
    
    <div class="other-handle-container">
      <div class="music-favorite">
        <PromptIcon 
          :iconType="isFavorited ? 'favorited' : 'favorite'" 
          status="prompt"
          @click="toggleFavorite"
        />
      </div>
      <div class="music-list">
        <PromptIcon iconType="list" status="prompt" @click.stop="onShowPlaylist"/>
      </div>
      <div class="music-user">
        <PromptIcon iconType="users" status="prompt" @click.stop="onShowUsers"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'


const props = defineProps({
  // 当前播放的音乐对象
  currentMusic: {
    type: Object,
    default:()=>({})
  },
  // 是否已收藏
  favorIdSet:{
    type:Set,
    default:()=>new Set([])
  },
  // 播放状态（由父组件控制）
  playing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:playing',
  'play',
  'pause',
  'next',
  'previous',
  'ended',
  'control-favor-toggle',
  'show-playlist',
  'show-users',
  'progress-change',
  'progress-drag-start',
  'progress-drag-end',
  'volume-change',
  'mode-change'
])

// 音频元素引用
const audioRef = ref(null)

// 内部状态
const isPlaying = ref(props.playing)
const playMode = ref('listloop')
const currentVolume = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const isDragging = ref(false)
let isFirstVolumeChange = true

// 收藏状态(计算属性)
const isFavorited = computed(()=>{
  return props.favorIdSet.has(props.currentMusic.id)
})
// 重置播放状态
const resetPlayState = () => {
  currentTime.value = 0
  duration.value = 0
  if (isPlaying.value) {
    safePlay()
  }
}
// 监听父组件传递的播放状态变化
watch(() => props.playing, (newVal) => {
  if (isPlaying.value !== newVal) {
    isPlaying.value = newVal
    syncPlayState()
  }
})

// 监听当前音乐变化
watch(() => props.currentMusic, () => {
  resetPlayState()
}, { immediate: true })


// 同步播放状态
const syncPlayState = async () => {
  const audio = audioRef.value
  if (!audio) return
  
  try {
    if (isPlaying.value) {
      await audio.play()
    } else {
      audio.pause()
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('播放控制失败:', error)
    }
  }
}



// 安全播放
const safePlay = () => {
  const audio = audioRef.value
  if (!audio) return
  
  audio.addEventListener('canplay', () => {
    audio.play().catch(error => {
      if (error.name !== 'AbortError') {
        console.error('播放失败:', error)
      }
    })
  }, { once: true })
}

// 播放/暂停切换
const togglePlay = async () => {
  const newState = !isPlaying.value
  isPlaying.value = newState
  emit('update:playing', newState)
  
  if (newState) {
    emit('play')
    await syncPlayState()
  } else {
    emit('pause')
    await syncPlayState()
  }
}

// 上一首
const onPrevious = () => {
  emit('previous')
}

// 下一首
const onNext = () => {
  emit('next')
}

// 播放结束
const onEnded = () => {
  isPlaying.value = false
  emit('update:playing', false)
  emit('ended')
  
  if (playMode.value === 'oneloop') {
    // 单曲循环
    audioRef.value.currentTime = 0
    nextTick(() => {
      safePlay()
    })
  } else {
    // 顺序播放，通知父组件播放下一首
    emit('next')
  }
}

// 设置播放模式
const setPlayMode = (mode) => {
  playMode.value = mode
  emit('mode-change', mode)
}

// 进度条相关
const onTimeupdate = (e) => {
  if (!isDragging.value) {
    currentTime.value = e.target.currentTime
  }
}

const onLoadedMetadata = (e) => {
  duration.value = e.target.duration
}

const onProgressClick = (value) => {
  if (!isDragging.value) {
    audioRef.value.currentTime = value
    emit('progress-change', value)
  }
}

const onDragStart = () => {
  isDragging.value = true
  emit('progress-drag-start')
}

const onDragEnd = async (value) => {
  isDragging.value = false
  
  const audio = audioRef.value
  if (audio) {
    audio.currentTime = value
    emit('progress-drag-end', value)
    
    if (isPlaying.value) {
      await nextTick()
      audio.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('播放失败:', error)
        }
      })
    }
  }
}

// 音量控制
watch(currentVolume, (newValue) => {
  if (isFirstVolumeChange) {
    isFirstVolumeChange = false
    return
  }
  
  const volume = newValue / 100
  if (audioRef.value) {
    audioRef.value.volume = volume
  }
  emit('volume-change', volume)
})

// 收藏切换
const toggleFavorite = () => {
  const type=isFavorited.value?'delete':'add'
  emit('control-favor-toggle',type)
}

// 显示播放列表
const onShowPlaylist = () => {
  emit('show-playlist')
}

// 显示用户列表
const onShowUsers = () => {
  emit('show-users')
}

// 初始化
onMounted(() => {
  const audio = audioRef.value
  if (audio) {
    currentVolume.value = audio.volume * 100
    
    if (audio.duration) {
      duration.value = audio.duration
    }
    
    if (props.playing) {
      safePlay()
    }
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
      
      .playmode-container {
        width: 30px;
        height: 30px;
        
        .mode-option-container {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      }
      
      .main-control-container {
        display: flex;
        gap: 20px;
        
        div {
          width: 30px;
          height: 30px;
        }
      }
      
      .volume-container {
        width: 30px;
        height: 30px;
        
        .volume-process-bar {
          width: 15vw;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
          
          .volume-text {
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
    
    div {
      height: 30px;
      width: 30px;
    }
  }
}
</style>