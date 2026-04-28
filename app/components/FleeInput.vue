<template>
    <el-input
        v-bind="$attrs"
        :class="{'only-bottom':onlyBottom}"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </el-input>
</template>

<script setup>
const props = defineProps({
    onlyBottom: {
        type: Boolean,
        default: false,
    }
})
</script>

<style lang="scss" scoped>
.only-bottom {
    :deep(.el-input__wrapper) {
        box-shadow: none;
        border-radius: 0;
        border-bottom: 1px solid var(--text-color);
    }
    :deep(.el-input__wrapper.is-focus) {
        border-bottom-color: var(--button-bg-color);
    }
}
</style>