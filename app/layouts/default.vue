<template>
  <div class="home-container">
    <UserSuspendBox
      class="user-suspend-box"
      :is-login="userStore.isLogin"
      :avator-path="userAvatarPath"
    />
    <MorphingTabs
      :tabs="tabs"
      :activeTab="activeTab"
      @update:activeTab="handleTabChange"
      class="header-tabs fixed top-[5vh] right-[5vw]"
    />
    <div class="main-box">
      <slot></slot>
    </div>
    <div class="footer-box">
      <div class="music-footer">
        <MusicGlobalController />
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()
const route = useRoute()

const userAvatarPath = computed(() => {
  return userStore.currentUser?.avatarPath || '/icons/unknown.svg'
})

const tabs = ['首页', '音乐', '媒体', '故事', '个人']
const activeTab = ref(tabs[0])

const resolveTabPath = (tab) => {
  const tabPathMap = {
    首页: '/',
    个人: `/user/${userStore.currentUser?.userId}`,
    音乐: '/music',
    媒体: '/media',
    故事: '/story'
  }

  return tabPathMap[tab] || '/'
}

const resolveActiveTab = (path) => {
  if (path === '/') return '首页'
  if (path.startsWith('/music')) return '音乐'
  if (path.startsWith('/media')) return '媒体'
  if (path.startsWith('/story')) return '故事'
  if (path.startsWith('/user') || path.startsWith('/login') || path.startsWith('/register')) return '个人'
  return tabs[0]
}

watch(
  () => route.path,
  (path) => {
    activeTab.value = resolveActiveTab(path)
  },
  { immediate: true }
)

const handleTabChange = async (tab) => {
  activeTab.value = tab
  const targetPath = resolveTabPath(tab)

  if (targetPath !== route.path) {
    await navigateTo(targetPath)
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: relative;

  .user-suspend-box {
    z-index: var(--z-header);
    position: fixed;
    left: 4vw;
    top: 2vh;
  }

  .header-tabs {
    z-index: var(--z-header);
  }

  .main-box {
    height: 100%;
    width: 100%;
  }

  .footer-box {
    position: fixed;
    height: 100px;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-music-container);

    .music-footer {
      width: 80%;
      height: 100%;
      z-index: var(--z-music-list);
    }
  }
}
</style>
