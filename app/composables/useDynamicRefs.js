// composables/useDynamicRefs.js
import { ref, onBeforeUpdate } from 'vue'

/**
 * 动态收集 v-for 元素的 ref 引用
 * @returns {Object} { refs, setRef }
 */
export function useDynamicRefs() {
  const refs = ref([])
  
  /**
   * 设置元素引用
   * @param {HTMLElement} el - DOM 元素
   * @param {number} index - 元素索引
   */
  const setRef = (el, index) => {
    if (el) {
      refs.value[index] = el
    }
  }
  
  // 每次更新前清空数组
  onBeforeUpdate(() => {
    refs.value = []
  })
  
  return {
    refs,
    setRef
  }
}