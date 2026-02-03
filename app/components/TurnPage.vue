<template>
  <div class="pages-container">
    <div v-for="(pageId) in pageIds"
    class="one-page"
    :key="pageId"
    >
      <slot :name="'page'+pageId">
      </slot>
    </div>
  </div>
</template>

<script setup>
const props=defineProps({
  totalPages:{
    type:Number,
    required:true,
  },
})
const pageIds=computed(()=>{
  return [...Array(props.totalPages)].map((_,index)=>index)
})
</script>

<style lang="scss" scoped>
.pages-container{
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  will-change: transform; 
  .one-page{
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

</style>