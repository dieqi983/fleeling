<template>
  <div class="profile-container">
    <img :src="props.path" alt="">
  </div>
</template>

<script setup>
import { computed } from 'vue';

  const props=defineProps({
    path:{
      type:String,
      default:'',
    },
    shape:{
      type:String,
      default:'circle',
      validator:(value)=>{
        return ['circle','square'].includes(value)
      }
    }
  })
  const radius=computed(()=>{
    return props.shape==='circle'?'100%':'10px'
  })
</script>

<style lang="scss" scoped>
  .profile-container{
    height: 100%;
    width: 100%;
    border-radius: v-bind(radius);
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>