<template>
  <div class="suspend-conitainer">
    <div class="circle-box">
      <Profile :path="props.isLogin?props.avatorPath:'/icons/unknown.svg'"/>
    </div>
    <div class="navi-text">
      <NuxtLink to="/about" class="link-text">
        {{props.isLogin?'退出':'登录'}}
      </NuxtLink>
      <NuxtLink to="/about" class="link-text">
        {{props.isLogin?'切换':'注册'}}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const props=defineProps({
    isLogin:{
      type:Boolean,
      default:false,
    },
    avatorPath:{
      type:String,
      default:'/icons/unknown.svg'
    }
  })
  
</script>

<style lang="scss" scoped>
.suspend-conitainer{
  display: flex;
  gap:20px;
  justify-content: center;
  align-items: center;
  .circle-box{
  height: 60px;
  width: 60px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 100%;
  box-shadow: 0 0 10px rgba(245, 108, 11, 0.5), 
              0 4px 8px rgba(0, 0, 0, 0.2);  
  }
  .navi-text{
    display: flex;
    flex-direction: column;
    gap: 18px;
    .link-text{
      text-decoration: none;
      color: black;
      font-size:var(--text-size-sm) ;
      &:hover{
        color: var(--button-bg-color);
      }
    }
  }
}

</style>