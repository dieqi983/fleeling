<template>
  <div class="profile-container">
    <img :src="props.path" alt="">
  </div>
</template>

<script setup>
  const props=defineProps({
    path:{
      type:String,
      default:'',
    }
  })
</script>

<style lang="scss" scoped>
  .profile-container{
    height: 100%;
    width: 100%;
    border-radius: 100%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>