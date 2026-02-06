<template>
  <div class="show-container">
    <div class="show-inside"></div>
    <div class="img-text-container">
      <div class="img-container">
        <DrawShow/>
      </div>
      <span class="img-descript-text"></span>
    </div>
  </div>
</template>

<script setup>
  const props=defineProps({
    userInfo:{
      type:Object,
      default:()=>({
        userProfile:'',
        userName:'',
        userArea:'',
      })
    }
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
    border: 1px black solid;
  }
  .img-text-container{
  flex: 1;
  height: 100%; 
  min-height: 500px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img-container{
    height: 70%;
    width: 70%;
    border: pink solid 1px;
  }
  }
}
</style>