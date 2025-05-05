<template>
  <form class="vk-form">
    <slot />
  </form>
</template>
<script lang="ts" setup>
import type { FormProps } from './types'

import { formContextKey } from './types';
import { provide } from 'vue';

const props = defineProps<FormProps>()

provide(formContextKey, props)

defineOptions({
  name: 'VkForm'
})

</script>
