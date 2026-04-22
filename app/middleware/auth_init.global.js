export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  if (userStore.authStatus !== 'unknown') {
    return
  }
  
  const result = await userStore.initAuth()
  if(!result){
    console.log('weidenglu')
  }
})
