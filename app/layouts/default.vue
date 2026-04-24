<template>
  <div class="home-container">
    <UserSuspendBox
      class="user-suspend-box"
      :is-login="userStore.isLogin"
      :avator-path="userAvatarPath"
      @click="handleLogin"
    />
    <ExtendButton
     class="extend-button"
     v-model="isOpenExtend"
     >
      <div class="navigator-box">
        <div class="close-icon" @click.stop="closeExtend">
          <Profile path="/icons/close.svg"/>
        </div>
        <div class="navigator-content">
          <NuxtLink class="navi-text" :to="{name:'music-edit'}">1.音乐中心</NuxtLink>
          <NuxtLink class="navi-text" :to="{name:'media'}">2.插图中心</NuxtLink>
          <NuxtLink class="navi-text" to="/">3.故事中心</NuxtLink>
          <NuxtLink class="navi-text" to="/">4.个人中心</NuxtLink>
        </div>
          <span class="other-text">本站还有很多不完善的地方，希望广大用户积极提供意见@jiegeng</span>
      </div>
    </ExtendButton>
    <div class="main-box">
      <slot></slot>
    </div>
    <div class="footer-box">
      <div class="music-footer">
        <MusicGlobalBlock/>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()
const userAvatarPath = computed(() => {
  return userStore.currentUser?.avatarPath || '/icons/unknown.svg'
})

const isOpenExtend=ref(false)
const closeExtend=()=>{
  isOpenExtend.value=false
}
const handleLogin=async ()=>{
  const result=await userStore.login(JSON.stringify(
    {
      userName:'jiegeng',
      passWord:'zw520hbh'
    }
  ))
  console.log(result)
}
</script>

<style lang="scss" scoped>
  .home-container{
    width: 100%;
    height: 100%;
    position: relative;
    .user-suspend-box{
      z-index: var(--z-header); 
      position: fixed; 
      left: 4vw; 
      top: 2vh;
    }
    .extend-button{
      z-index: var(--z-header);
      position: fixed;
      right: 4vw;
      top: 2vh;
      .navigator-box{
        
        height: 100%;
        width: 100%;  
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .close-icon{
          width: 55px;
          height: 55px;
          position: absolute;
          right:30px ;
          top: 30px;
          &:hover{
            cursor: pointer;
          }
        }
        .navigator-content{
          padding-left:2vw ;
          height: 70%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4vh;
          .navi-text{
            text-decoration: none;
            color:var(--text-un-color);
            font-size: 35px;
            display: block;
            &:hover{
              color: var(--button-bg-color);
            }
          }
        }
          .other-text{
            padding: 0 1vw 0 1vw;
            color: white;
            word-wrap: break-word;      /* 允许长单词换行 */
            word-break: break-all;      /* 允许在任意字符间换行 */
            white-space: normal;        /* 正常换行（默认值） */
            display: inline-block;      /* 或 block，使其能设置宽度 */
            max-width: 100%;            /* 限制最大宽度 */
          }
      }
    }
    .main-box{
      height: 100%;
      width: 100%;
    }
    .footer-box{
      position: fixed;
      height: 100px;
      width: 100%;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--z-music-container);
      .music-footer{
        width: 80%;
        height: 100%;
        z-index:var(--z-music-list) ;
      }
    }
  }
</style>
