<template>
  <div class="register-container">
    <el-form>
      <el-form-item label="用户名：">
        <FleeInput :onlyBottom="true"/>
      </el-form-item>
    </el-form>
  </div>

</template>

<script setup>

definePageMeta({
  layout: false
})
</script>

<style lang="scss" scoped>
.register-container{
  height: 400px;
  width: 600px;
  border: 1px solid black;
}
</style>

