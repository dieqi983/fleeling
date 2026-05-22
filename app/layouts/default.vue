<template>
  <div class="relative w-full h-full">
  <el-drawer 
  v-model="isOpenDrawer" 
  >
  <template #header>
    <div class="w-full h-6 2xl:h-10 flex gap-5 items-center">
      <div class="aspect-square h-full 2xl:w-10 2xl:h-10">
        <img src="/icons/many-edit.svg" alt="">
      </div>
      <span class=" text-xl 2xl:text-3xl">播放队列</span>
    </div>
  </template>

    <MusicPlayList/>
  </el-drawer>
    <UserSuspendBox
      class="fixed left-[4vw] top-[3vh] 2xl:left-[6vw] 2xl:top-[5vh] z-[var(--z-header)]"
      :is-login="userStore.isLogin"
      :avator-path="userAvatarPath"
    />
    <MorphingTabs
      :tabs="tabs"
      :activeTab="activeTab"
      @update:activeTab="handleTabChange"
      class="fixed top-[6vh] right-[4vw] 2xl:top-[7vh] 2xl:right-[6vw] z-[var(--z-header)]"
    />
    <div class="w-full h-full">
      <slot></slot>
    </div>
    <div class="fixed bottom-0 flex items-center justify-center w-full max-w-430 h-[13vh] 2xl:h-[14vh] left-1/2 -translate-x-1/2 ">
      <div class="w-4/5 h-full shadow-2xl">
        <MusicController
        :currentMusic="curPlayMusic" 
        @show-playlist="isOpenDrawer=true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpenDrawer=ref(false)
const {curPlayMusic}=storeToRefs(useMusicStore())
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
<style scoped>
:deep(.el-drawer__body) {
  padding: 0 !important;
  padding-left:10px !important;
}
</style>