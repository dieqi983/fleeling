export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)
  const accessToken = ref(null)
  const authStatus = ref('unknown')
  let refreshPromise = null

  const isLogin = computed(() => {
    return currentUser.value !== null && accessToken.value !== null
  })

  const applyAuth = (authData) => {
    accessToken.value = authData.accessToken
    currentUser.value = authData.user
    authStatus.value = 'authenticated'
  }

  const clearAuth = () => {
    accessToken.value = null
    currentUser.value = null
    authStatus.value = 'anonymous'
  }

  const login = async (user) => {
    console.log(useNuxtApp())
    const { $$request } = useNuxtApp()
    const result = await $$request('/auth/login', {
      method: 'POST',
      body: user,
    })

    applyAuth(result)
    return result
  }

  const logout = async () => {
    const { $request } = useNuxtApp()

    try {
      await $request('/auth/logout', {
        method: 'POST',
      })
    } finally {
      clearAuth()
    }
  }

  const refreshAuth = async () => {
    const { $$request } = useNuxtApp()

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const result = await $$request('/auth/refresh', {
            method: 'POST',
          })

          applyAuth(result)
          return result.accessToken
        } catch (error) {
          clearAuth()
          throw error
        } finally {
          refreshPromise = null
        }
      })()
    }

    return refreshPromise
  }

  const initAuth = async () => {
    if (authStatus.value !== 'unknown') {
      return isLogin.value
    }

    try {
      await refreshAuth()
      return true
    } catch {
      return false
    }
  }

  return {
    currentUser,
    accessToken,
    authStatus,
    isLogin,
    applyAuth,
    clearAuth,
    login,
    logout,
    refreshAuth,
    initAuth,
  }
})
