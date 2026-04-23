export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  if (userStore.authStatus !== 'unknown') {
    return
  }
  
  await userStore.initAuth()
})
