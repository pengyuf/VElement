<template>
  <div v-if="isVisible" role="alert" class="vk-alert" :class="{
    [`vk-alert--${type}`]: type,
    [`is-${effect}`]: effect,
    'is-center': center,
  }">
    <template v-if="showIcon">
      <Icon :icon="iconMap[type]" class="vk-alert__icon" />
    </template>
    <div class="vk-alert__content">
      <span class="vk-alert__title">{{ title }}</span>
      <p class="vk-alert__description" v-if="description">{{ description }}</p>
      <div class="vk-alert__close-btn" v-if="closable" @click="handleClose">
        {{ closeText }}
        <Icon v-if="!closeText" icon="fa-times" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AlertProps, AlertEmits } from './types'
import Icon from "../Icon/Icon.vue";
import { ref } from 'vue';

const iconMap = {
  success: 'fa-check-circle',
  warning: 'fa-exclamation-circle',
  info: 'fa-info-circle',
  error: 'fa-exclamation-circle',
}

const isVisible = ref(true)

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  closable: true,
  center: false,
  showIcon: false,
  effect: 'light',
})
const emits = defineEmits<AlertEmits>()

defineOptions({
  name: 'VKAlert',
})

const handleClose = () => {
  if (props.closable) {
    isVisible.value = false
    emits('close')
  }
}

</script>
<style></style>
