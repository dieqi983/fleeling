<template>
  <div class=" w-screen relative h-screen">
    <div class=" w-150 h-20 absolute top-1/2 left-1/2 -translate-x-1/2">
      <FleeItem v-model="isCheck" :isBatchMode="true" :bgIsGray="false" >
        <template #item-operate>
          <h1>你好</h1>
        </template>

      </FleeItem>
    </div>
  </div>

</template>

<script setup>
const isCheck=ref(false)
const isActive=ref(false)
</script>

<style lang="scss" scoped>

</style>