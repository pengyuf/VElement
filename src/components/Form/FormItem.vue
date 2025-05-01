<template>
  <div class="vk-form-item">
    <label class="vk-form-item__lable"><slot name="label" :label="label">{{ label }}</slot></label>
    <div class="vk-form-item__content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FormItemProps } from './types'

defineOptions({
  name: 'VkFormItem'
})

const props = defineProps<FormItemProps>()

</script>
