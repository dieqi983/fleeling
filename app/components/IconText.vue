<template>
  <div class="icon-text-container">
    <div class="icon-box">
      <img :src="addrIcon" alt="">
    </div>
      <span>重庆</span>
  </div>
</template>

<script setup>
import addrIcon from '../assets/icons/address.svg'
</script>

<style lang="scss" scoped>
.icon-text-container{
  display: flex;
  color: var(--text-un-color);
  align-items: center;
  .icon-box{
    height:clamp(1rem, 2vw, 1.3rem);
    width: clamp(1rem, 2vw, 1.3rem);
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