export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (userStore.authStatus === 'unknown') {
    await userStore.initAuth()
  }

  if (userStore.isLogin) {
    return
  }

  return navigateTo('/login')
})
