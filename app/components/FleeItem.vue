<template>
  <li 
  :class="[
    'group list-none h-full w-full border -mt-px flex transition-colors duration-300 ease-in-out',
    {'bg-gray-100': bgIsGray && !isActive},
    {'bg-(--button-bg-color)':isActive},
    {'hover:bg-(--button-bg-color)':!isActive}
    ]"
  @click="handleClick"
  >
    <div 
    class=" w-7 h-full flex items-center justify-center pl-2.5"
    v-if="isBatchMode"
    >
      <el-checkbox
      @click.stop 
      :modelValue="modelValue" 
      @update:modelValue="emit('update:modelValue',$event)"
      />
    </div>
    <div class="w-1/4 h-full flex items-center justify-center ">
      <slot name="item-info"/>
    </div>

    <div class="w-1/4 h-full flex justify-center items-center ">
      <slot name="item-other"/>
    </div>
    <div class="flex-1 h-full flex justify-center items-center">
    <div :class="[
      'flex justify-center items-center w-full h-full transition-opacity duration-300 ease-in-out opacity-0',
      {'opacity-100':isActive},
      {'group-hover:opacity-100':!isActive}
      ]">
      <slot name="item-operate"/>
    </div>
    </div>
  </li>
</template>
<script setup>
import { ref } from 'vue';

const props=defineProps({
  bgIsGray:{
    type:Boolean,
    default:false,
  },
  isBatchMode:{
    type:Boolean,
    default:false,
  },
  modelValue:{
    type:Boolean,
    default:false,
  },
  isActive:{
    type:Boolean,
    default:false
  }
})

const emit=defineEmits(['update:modelValue','update:isActive'])
const handleClick=()=>{
  if(props.isBatchMode)
    emit('update:modelValue',!props.modelValue)
  else{
    emit('update:isActive',!props.isActive)
  }
}

</script>