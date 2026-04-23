import { unwrapResponse } from '../utils'

function buildHeaders(options) {
  return new Headers(options.headers || {})
}

function appendServerCookie(headers) {
  if (!import.meta.server || headers.has('cookie')) {
    return headers
  }

  const requestHeaders = useRequestHeaders(['cookie'])

  if (requestHeaders.cookie) {
    headers.set('cookie', requestHeaders.cookie)
  }

  return headers
}

function withAuthHeader(options, token) {
  const headers = buildHeaders(options)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const sharedOptions = {
    baseURL: config.public.apiBase,
    credentials: 'include',
    onRequest({ options }) {
      options.headers = appendServerCookie(buildHeaders(options))
    },
    onResponse({ response }) {
      if (!response.ok) {
        return
      }

      response._data = unwrapResponse(response._data)
    },
  }

  const $request = $fetch.create(sharedOptions)

  const $api = async (request, options = {}) => {
    try {
      return await $request(request, {
        ...options,
        headers: withAuthHeader(options, userStore.accessToken),
        credentials: 'include',
      })
    } catch (error) {
      if (error?.response?.status !== 401) {
        throw error
      }

      const newToken = await userStore.refreshAuth()

      return await $request(request, {
        ...options,
        headers: withAuthHeader(options, newToken),
        credentials: 'include',
      })
    }
  }

  return {
    provide: {
      $request,
      $api,
    },
  }
})
