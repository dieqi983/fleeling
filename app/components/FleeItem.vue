<template>
  <li 
    :class="[
      'group list-none h-full w-full border -mt-px flex transition-colors duration-300 ease-in-out cursor-pointer hover:bg-(--button-bg-color)',
      {'bg-gray-50': bgIsGray},
    ]"
    @click="handleClick"
  >
    <!-- 批量模式复选框 -->
    <div 
      class="w-7 h-full flex items-center justify-center pl-2.5"
      v-if="isBatchMode"
    >
      <el-checkbox
        @click.stop 
        :modelValue="isSelected" 
        @update:modelValue="handleChangeCheck"
      />
    </div>

    <!-- 主要信息区域 -->
    <div class="w-1/3 h-full flex items-center justify-center">
      <slot name="item-info"/>
    </div>

    <!-- 附加信息区域 -->
    <div class="w-1/3 h-full flex justify-center items-center">
      <slot name="item-other"/>
    </div>

    <!-- 操作按钮区域（悬停或激活时显示） -->
    <div class="flex-1 h-full flex justify-center items-center">
      <div :class="[
        'flex opacity-0 justify-center items-center w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-100',
      ]">
        <slot name="item-operate"/>
      </div>
    </div>
  </li>
</template>

<script setup>

const props = defineProps({
  // 是否使用灰色背景
  bgIsGray: {
    type: Boolean,
    default: false,
  },
  // 是否处于批量模式
  isBatchMode: {
    type: Boolean,
    default: false,
  },
  // 是否被选中（批量模式）
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['selected', 'unSelect'])

// 处理项目点击
const handleClick = () => {
  if (props.isBatchMode) {
    // 批量模式：切换选中状态
    if (!props.isSelected) {
      emit('selected', true)
    } else {
      emit('unSelect', false)
    }
  } else {
    return
  }
}

// 处理复选框变化
const handleChangeCheck = (value) => {
  // 根据复选框的新值触发相应事件
  if (value) {
    emit('selected', value)
  } else {
    emit('unSelect', value)
  }
}
</script>