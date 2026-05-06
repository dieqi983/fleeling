export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function unwrapResponse(result) {
  if (!result) {
    throw new Error('Response body is empty')
  }

  if (result.code !== 0) {
    ElMessage({
      type:'error',
      message:result.message,
      plain:true
    })
    throw createError({
      statusCode: 400,
      message: result.message || 'Request failed',
      data: result,
    })
  }

  return result.data
}

export const ANIMATED_MODAL_KEY = Symbol("AnimatedModal");