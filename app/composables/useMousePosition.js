

/**
 * @param targetRef 目标元素的 ref
 * @returns 鼠标位置状态和方法
 */
export function useMousePosition(targetRef) {
  // 状态：鼠标在元素内的坐标
  const x = ref(0)
  const y = ref(0)
  
  // 状态：鼠标是否在元素内部
  const isInside = ref(false)

  // 更新鼠标位置的函数
  const updatePosition = (event) => {
    if (!targetRef.value) return
    
    const rect = targetRef.value.getBoundingClientRect()
    
    // 计算鼠标相对于元素的位置
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top
    
    // 检查鼠标是否在元素边界内
    const inside = (
      relativeX >= 0 &&
      relativeY >= 0 &&
      relativeX <= rect.width &&
      relativeY <= rect.height
    )
    
    // 只有鼠标在元素内时才更新坐标
    if (inside) {
      x.value = relativeX
      y.value = relativeY
    }
    
    isInside.value = inside
  }

  // 鼠标进入元素时触发
  const handleMouseEnter = (event) => {
    updatePosition(event)
  }

  // 鼠标在元素内移动时触发
  const handleMouseMove = (event) => {
    updatePosition(event)
  }

  // 鼠标离开元素时触发
  const handleMouseLeave = () => {
    isInside.value = false
  }

  // 添加事件监听器
  const attachListeners = () => {
    const element = targetRef.value
    if (!element) return
    
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
  }

  // 移除事件监听器
  const removeListeners = () => {
    const element = targetRef.value
    if (!element) return
    
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }

  // 组件挂载时添加监听
  onMounted(() => {
    attachListeners()
  })

  // 组件卸载时移除监听
  onUnmounted(() => {
    removeListeners()
  })

  // 返回给组件使用的内容
  return {
    // 状态
    x,
    y,
    isInside,
    updatePosition,
    attachListeners,
    removeListeners,
  }
}