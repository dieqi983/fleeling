<template>
  <div class="top-work-container">
    <div class="info-box">
      <div class="top-box" @click="toPreviousUser">
        <img src="/icons/arrow-top.svg" alt="">
      </div>
      <h1>获赞 : {{topUser.likes}}</h1>
      <div class="user-info-box">
        <SlideText 
        :text="`TOP用户 : ${topUser.userName}`" 
        textColor="white"
        />
        <GuideButton 
        :naviInfo="{text:'GO',path:'/'}"
        />
      </div>
      <div class="bottom-box" @click="toNextUser">
        <img src="/icons/arrow-bottom.svg" alt="">
      </div>
    </div>
    <div class="work-display-box">
      <div class="img-box">
        <DrawShow :path="topUser.masterpiecePath"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props=defineProps({
  topUsers:{
    type:Array,
    default:()=>[],
  }
})
const currentIndex=ref(0)
const topUser=computed(()=>{
  return props.topUsers[currentIndex.value]
})
const toPreviousUser=()=>{
  if(currentIndex.value<=0){
    return
  }
  currentIndex.value--
}
const toNextUser=()=>{
  if(currentIndex.value>=props.topUsers.length-1){
    return
  }
  currentIndex.value++
}
</script>

<style lang="scss" scoped>
// 定义向上移动的动画（箭头向上）
@keyframes moveUpAndDown {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-15px);
  }
}

// 定义向下移动的动画（箭头向下）
@keyframes moveDownAndUp {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(15px);
  }
}

.top-work-container{
  color: white;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .info-box{
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .top-box{
      height: 30px;
      width: 30x;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 30vh;
      animation: moveUpAndDown 1.5s ease-in-out infinite;
      &:hover{
        cursor: pointer;
      }
      img{
        height: 100%;
        width: 100%;
      }
    }
    .user-info-box{
      display: flex;
      gap: 2vw;
    }
    .bottom-box{
      height: 30px;
      width: 30px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 30vh;
      animation: moveDownAndUp 1.5s ease-in-out infinite;
      &:hover{
        cursor: pointer;
      }
      img{
        height: 100%;
        width: 100%;
      }
    }
  }
  .work-display-box{
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-box{
      // background-color: orange;
      width: 50vw;
      height: 60vh;
    }
  }
}
</style>