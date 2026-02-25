<template>
  <div class="icon-text-container">
    <div class="icon-box">
      <img :src="iconSrc" alt="">
    </div>
      <span>{{props.text}}</span>
  </div>
</template>

<script setup>

const props=defineProps({
  iconType:{
    type:String,
    required:true,
  },
  text:{
    type:String,
    required:true,
  }
})
const iconSrc=computed(()=>{
  return `/icons/${props.iconType}.svg`
})
</script>

<style lang="scss" scoped>
.icon-text-container{
  display: flex;
  color: var(--text-un-color);
  align-items: center;
  justify-content: center;
  .icon-box{
    height:clamp(1.2rem, 2vw, 1.3rem);
    width: clamp(1.2rem, 2vw, 1.3rem);
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
    span{
      font-size: var(--text-size-sm);
    }
}
</style>