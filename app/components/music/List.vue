<template>
  <div class="w-full h-full">
    <el-card 
    style="height: 100%;width: 100%;"
    :body-style="{ padding: '0px'}"
    >
      <template #header>
        <div class="w-full h-full flex gap-4 items-center">
          <div class="w-5 h-5">
            <PromptIcon 
            iconType="many-edit"
            :promptText="isManyEdit?'退出批量':'批量操作'"
            @click="toggleEdit"
            />
          </div>
          <span class=" text-xl">{{ title }}</span>
        </div>
      </template>
      <slot/>
      <template #footer v-if="isManyEdit">
        <slot name="footer"/>
      </template>
    </el-card>
  </div>
</template>
<script setup>
  const props=defineProps({
    title:{
      type:String,
      default:'播放列表'
    }
  })
  const emit=defineEmits(['doManyEdit','unManyEdit'])
  const isManyEdit=ref(false)
  const toggleEdit=()=>{
    isManyEdit.value=!isManyEdit.value
    if(isManyEdit.value){
      emit('doManyEdit')
    }
    else{
      emit('unManyEdit')
    }
  }
</script>
