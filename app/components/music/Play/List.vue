<template>
  <MusicList 
  @doManyEdit="enterManyMode"
  @unManyEdit="exitManyMode"
  >
    <div class="w-full max-h-80">
      <div
      class=" w-full h-18"
      v-for="(music,index) in curMusicList"
      :key="music.id"
      >
        <MusicItem
        :isBatchMode="isBatchMode"
        :music="music"
        :bgIsGray="index%2===0"
        >
        <div class=" w-full h-full flex justify-center items-center gap-5">
          <div class="w-6 h-6">
            <PromptIcon
            iconType="play"
            />
          </div>
          <div class="w-6 h-6">
            <PromptIcon
            iconType="delete"
            />
          </div>
          <div class="w-6 h-6">
            <PromptIcon
            iconType="download"
            />
          </div>
          <div class="w-6 h-6">
            <PromptIcon
            iconType="toTop"
            />
          </div>  
        </div>
        </MusicItem>
      </div>
    </div>
    <template #footer>
      <div class="w-full h-full flex gap-15 justify-center items-center">
        <div class="w-8 h-8">
          <PromptIcon
          iconType="delete"
          />
        </div>
        <div class="w-8 h-8">
          <PromptIcon
          iconType="download"
          />
        </div>
      </div>
    </template>
  </MusicList>
</template>

<script setup>
  const { curMusicList }=storeToRefs(useMusicStore())
  const isBatchMode=ref(false)  
  const enterManyMode=()=>{
    isBatchMode.value=true
  }
  const exitManyMode=()=>{
    isBatchMode.value=false
  }
</script>

<style lang="scss" scoped>

</style>

