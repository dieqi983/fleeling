<template>
  <div class="guide-container" :data-size="props.size">
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
  },
  size:{
    type:String,
    default:'md',
    validator(value){
      return ['lg','md','sm'].includes(value)
    }
  }
})
</script>

<style lang="scss" scoped>
  .guide-container[data-size='md']{
    --guide-size:var(--text-size-md);
    --icon-size: clamp(1.8rem, 4vw, 2.8rem);
  }
    .guide-container[data-size='lg']{
    --guide-size:var(--text-size-lg);
    --icon-size: clamp(2.3rem, 4.4vw, 3.2rem);
  }
    .guide-container[data-size='sm']{
    --guide-size:var(--text-size-sm);
    --icon-size: clamp(1.5rem, 3.2vw, 2rem);
  }
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
        color:var(--text-color);
        text-decoration: none;
        font-size: var(--guide-size);
        font-weight: 500;
        white-space: nowrap; 
        transition: all 0.3s ease;
      }
    }
    .icon-box {
      padding: 6px 5px 0 0;
      width:var(--icon-size);
      height: var(--icon-size);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
    }
    .icon {
      width: 100%;
      height: 100%;
      color:var(--text-color);
      transition: all 0.3s ease;
    }
    &:hover{
      .icon-box{
        transform: translate(5px, -5px); 
      }
      .nav-link{
        color: var(--button-bg-color);
      }
      .icon{
        color:var(--button-bg-color)
      }
    }
  }
</style>