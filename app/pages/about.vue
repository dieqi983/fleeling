<template>
  <div class="about-container">
    <TurnPage :totalPages="3">
      <template #page0>
        <div style="background-color: aquamarine;height: 100%; width: 100%;">
        </div>
      </template>
      <template #page1>
        <div style="background-color: pink; height: 100%; width: 100%;">
        </div>
      </template>
      <template #page2>
        <div style="background-color: red; height: 100%; width: 100%;">
        </div>
      </template>
    </TurnPage>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.about-container{
  height: 100%;
  width: 100%;
}
</style>