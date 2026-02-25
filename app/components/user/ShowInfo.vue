<template>
  <div class="userinfo-show-container">
    <div class="profile-box">
      <div class="profile">
        <Profile path="/textures/5.jpg"/>
      </div>
    </div>
    <div class="info-box">
        <span class="username">蝶祈</span>
        <div class="other-info">
          <IconText iconType="like" text="12"/>
          <IconText iconType="address" text="重庆"/>
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
    border-right: 1px solid var(--text-un-color);
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
    .other-info{
      display: flex;
      gap: 15px;
    }
  }
}
</style>