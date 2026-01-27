<template>
  <div class="index-container">
    <div class="button-box">
      <extend-button
      v-model="buttonIsOpen"
      >
      <div 
      class="test-list"
      >
        <span>winter</span>
        <span>sumer</span>
        <span>spring</span>
        <span>autamn</span>
      </div>
      </extend-button>
    </div>
    <div class="cube-container">
      <Cube
      :textures="[
        '/textures/1.jpg',
        '/textures/2.jpg',
        '/textures/3.jpg',
        '/textures/4.jpg',
        '/textures/5.jpg',
        '/textures/6.jpg',
      ]"
      :cubeSize="{
        height:4,
        width:4,
        depth:4,
      }"
      :cameraPositon="{
        x:0,
        y:0,
        z:7.5,
      }"
      />
    </div>
      <GuideBar/>
</div>
</template>

<script setup>

const buttonIsOpen=ref(false)
const closeButton=()=>{
  buttonIsOpen.value=false
}

</script>

<style lang="scss" scoped>
.index-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .cube-container{
  width: min(80vmin, 700px);
  aspect-ratio: 1 / 1;
  }
  .button-box{
  position: fixed;
  top: 5vh;
  right:5vw;
    .test-list{
      color: white;
      display: flex;
      font-size: 30px;
      padding: 10px;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }
  .guide-box{
    height: 50px;
    width:150px;
  }
}
</style>