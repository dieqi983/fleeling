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
      response._data = unwrapResponse(response._data)
    },
  }

  const $request = $fetch.create(sharedOptions)

  const $api = $fetch.create({
    ...sharedOptions,
    onRequest({ options }) {
      const headers = appendServerCookie(buildHeaders(options))

      if (userStore.accessToken) {
        headers.set('Authorization', `Bearer ${userStore.accessToken}`)
      }

      options.headers = headers
    },
    async onResponseError({ request, response, options, error }) {
      if (response?.status !== 401) {
        throw error
      }

      const newToken = await userStore.refreshAuth()
      const headers = appendServerCookie(buildHeaders(options))

      headers.set('Authorization', `Bearer ${newToken}`)

      return await $request(request, {
        ...options,
        headers,
        credentials: 'include',
      })
    },
  })

  return {
    provide: {
      $request,
      $api,
    },
  }
})
