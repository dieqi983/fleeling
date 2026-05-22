<template>
  <div class="flex justify-center items-center gap-5 2xl:gap-8">
    <div class="                                     
      w-15 h-15             
      2xl:w-30 2xl:h-30     
      rounded-full border border-black 
      shadow-[0_0_10px_rgba(245,108,11,0.5),0_4px_8px_rgba(0,0,0,0.2)]
    ">
      <el-avatar
        :src="props.isLogin ? props.avatorPath : '/icons/unknown.svg'"
        style="height: 100%; width: 100%; background-color: white;"
      />
    </div>
    <div class="flex flex-col gap-4.5 2xl:gap-10">
      <NuxtLink to="/login" class="text-black no-underline xl:text-lg 2xl:text-4xl hover:text-(--button-bg-color)">
        {{ props.isLogin ? '退出' : '登录' }}
      </NuxtLink>
      <NuxtLink to="/"  class="text-black no-underline xl:text-lg 2xl:text-4xl hover:text-(--button-bg-color)">
        {{ props.isLogin ? '切换' : '注册' }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLogin: {
    type: Boolean,
    default: false,
  },
  avatorPath: {
    type: String,
    default: '/icons/unknown.svg'
  }
})
</script>