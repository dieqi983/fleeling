<template>
  <div class="userinfo-show-container">
    <div class="profile-box">
      <div class="profile">
        <Profile path="/textures/5.jpg"/>
      </div>
    </div>
    <div class="info-box">
        <span class="username">蝶祈</span>
        <div class="othen-info">
          <span>12</span>
          <IconText/>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.userinfo-show-container{
  display: flex;
  height: 100%;
  width: 100%;
  border-radius:25px;
  background-color: var(--button-bg-color);
  .profile-box{
    width: auto;
    height: 100%; 
    aspect-ratio: 1 / 1; 
    border-right: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    .profile{
      height: 80%;
      width: 80%;
    }
  }
  .info-box{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .username{
      color: var(--text-un-color);
      font-size: var(--text-size-md);
    }
    .othen-info{

    }
  }
}
</style>