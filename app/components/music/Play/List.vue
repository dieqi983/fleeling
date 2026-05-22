<template>
    <div class="w-full ">
      <div
      class=" w-full h-20 2xl:h-33"
      v-for="(music,index) in curMusicList"
      :key="music.id"
      >
        <MusicItem
        :needOther="false"
        :isBatchMode="isBatchMode"
        :music="music"
        :bgIsGray="index%2===0"
        >
        <div class=" w-full h-full flex justify-center items-center gap-5">
          <div class="w-6 h-6 2xl:w-9 2xl:h-9">
            <PromptIcon
            :iconType="music.id === curPlayMusic.id && isPlaying ? 'pause':'play'"
            @click="controlPlay(music)"
            />
          </div>
          <div class="w-6 h-6 2xl:w-9 2xl:h-9">
            <PromptIcon
            iconType="delete"
            />
          </div>
          <div class="w-6 h-6 2xl:w-9 2xl:h-9">
            <PromptIcon
            iconType="download"
            />
          </div>
          <div class="w-6 h-6 2xl:w-9 2xl:h-9">
            <PromptIcon
            iconType="toTop"
            @click="toNextPlay(music)"
            />
          </div>  
        </div>
        </MusicItem>
      </div>
    </div>
</template>

<script setup>
  const { curMusicList,isPlaying,curPlayMusic }=storeToRefs(useMusicStore())
  const { play,pausePlay,changePlayMusic,addNextToPlay}=useMusicStore()
  const isBatchMode=ref(false)  
  const enterManyMode=()=>{
    isBatchMode.value=true
  }
  const exitManyMode=()=>{
    isBatchMode.value=false
  }
  const controlPlay=(music)=>{
    const isCurPlayMusic=music.id === curPlayMusic.value.id
    if(isCurPlayMusic){
      if(isPlaying.value){
        pausePlay()
      }
      else{
        play()
      }
    }
    else{
      changePlayMusic(music)
    }
  }
  const toNextPlay=(music)=>{
    if(music.id===curPlayMusic.value.id){
      return
    }
    else{
      addNextToPlay(music)
    }
  }
</script>

<style lang="scss" scoped>

</style>

