<template>
  <div class="guide-container">
    <div class="link-box">
      <NuxtLink
      :to="props.naviInfo.path"
      class="nav-link"
      >
      {{props.naviInfo.text}}
      </NuxtLink>
    </div>
    <div class="icon-box">
      <Icon icon="material-symbols:arrow-outward-rounded" class="icon"/>
    </div>
  </div>
</template>

<script setup>
const props=defineProps({
  naviInfo:{
    type:Object,
    default:()=>({
      text:'默认嘻嘻嘻',
      path:'/'
    })
  }
})
</script>

<style lang="scss" scoped>
  .guide-container{
    display: flex;
    justify-content: center;
    align-items: center;
    .link-box{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .nav-link{
        color: black;
        text-decoration: none;
        font-size: clamp(1.1rem, 2.5vw, 1.8rem);
        font-weight: 500;
        white-space: nowrap; 
      }
    }
    .icon-box {
      padding: 6px 5px 0 0;
      width: clamp(1.5rem, 4vw, 2.8rem);
      height: clamp(1.5rem, 4vw, 2.8rem);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
    }
    .icon {
      width: 100%;
      height: 100%;
      color: #0a0a0a;
    }
    &:hover{
      .icon-box{
        transform: translate(5px, -5px); 
      }
    }
  }
</style>