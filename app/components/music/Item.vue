<template>
  <div class="w-full h-full">
    <FleeItem 
    v-bind="filteredAttrs"
    @selected="selectMusic"
    @unSelect="unSelectMusic"
    >
    <template #item-info>
      <div class=" w-full h-full flex pl-3 items-center">
        <div class="h-[80%] aspect-square relative">
          <el-avatar 
          :src="music.pic"
          shape="square"
          style="height: 100%; width: 100%;"
          />
          <div 
          class="absolute inset-0 bg-black/40 opacity-100 transition-opacity duration-200 flex justify-center items-center"
          v-if="Playing"
          >
            <div class="w-8 h-8">
              <img src="/icons/playing.svg" alt="">
            </div>
          </div>
        </div>
        <div class="h-full flex flex-1 flex-col gap-1 justify-center pl-5 min-w-0 overflow-hidden">
          <span class=" truncate text-xl">{{music.name}}</span>
          <span class=" truncate">{{music.singer}}</span>
        </div>
      </div>
    </template>
    <template #item-other>
      <div class="w-full h-full flex justify-center items-center">
        <span class=" text-xl">{{formatTime(music.duration)}}</span>
      </div>
    </template>
    <template #item-operate>
      <slot/>
    </template>
    </FleeItem>
  </div>
</template>

<script setup>
const attrs = useAttrs()
const attrWhiteList=['bgIsGray','isBatchMode','needOther']
const filteredAttrs = computed(() => {
  return Object.fromEntries(
    Object.entries(attrs).filter(([key])=>attrWhiteList.includes(key))
  )
})
const props=defineProps({
  music:{
    type:Object,
    default:()=>({})
  }
})
const { curPlayMusic,isPlaying }=storeToRefs(useMusicStore())
const Playing=computed(()=>{
  return curPlayMusic.value.id===props.music.id
})
const emit=defineEmits(['selectMusic','unSelectMusic'])
const selectMusic=(e)=>{
  emit('selectMusic',props.music.id)
}
const unSelectMusic=(e)=>{
  emit('unSelectMusic',props.music.id)
}
</script>

<style lang="scss" scoped>

</style>