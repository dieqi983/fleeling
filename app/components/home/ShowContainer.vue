<template>
  <div class="show-container">
    <div class="show-inside">
      <div class="carousel-container">
        <Carousel :imgs="otherImgPaths"/>
      </div>
    </div>
    <div class="img-text-container">
      <div class="img-container">
        <DrawShow :path="firstImgPath"/>
      </div>
      <div class="img-descript-container">
        <span class="img-descript-text">
          {{firstImgDescript}}
        </span>
        <GuideBar 
        size="sm"
        :naviInfo="naviInfo"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';


  const props=defineProps({
    path:{
      type:String,
      default:'/',
    },
    userInfo:{
      type:Object,
      default:()=>({
        userName:'',
        likeTotal:0,
      })
    },
    drawInfo:{
      type:Array,
      default:()=>[
        {
          path:'',
          descript:'',
        }
      ]
    }
  })
  const naviInfo=computed(()=>{
    return {
      text:props.userInfo.userName,
      path:props.path,
    }
  })
  const firstImgPath=computed(()=>{
    return props.drawInfo[0].path
  })
  const firstImgDescript=computed(()=>{
    return props.drawInfo[0].descript
  })
  const otherImgPaths=computed(()=>{
    const otherImgInfos = props.drawInfo.slice(1)
    const paths=otherImgInfos.map(imgInfo=>imgInfo.path)
    return paths
  })
</script>

<style lang="scss" scoped>
.show-container{
  height: 100%;
  width: 100%;
  display: flex;
  .show-inside{
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    .carousel-container{
      height: 40%;
      width: 100%;
      transform: translateX(3vw);
    }
  }
  .img-text-container{
  flex: 1;
  height: 100%; 
  min-height: 500px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:1vh;
  .img-container{
    height: 70%;
    width: 70%;
  }
  .img-descript-container{
    font-size:var(--text-size-sm) ;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2vw;
    .img-descript-text{
      display: block;
    }
  }
  }
}
</style>