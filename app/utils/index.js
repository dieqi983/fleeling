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
    throw createError({
      statusCode: 400,
      message: result.message || 'Request failed',
      data: result,
    })
  }

  return result.data
}
