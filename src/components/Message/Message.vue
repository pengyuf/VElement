<template>
  <div role="alert" class="vk-message" :class="{
    [`vk-message--${type}`]: type,
    'is-close': showClose,
  }" v-show="visible">
    <div class="vk-message__content">
      <slot>
        <RenderVnode :vnode="message" v-if="message" />
      </slot>
    </div>
    <div class="vk-message__close" v-if="showClose">
      <Icon icon="xmark" @click.stop="visible = false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MessageProps } from './types'
import Icon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode';
import { onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
})

const visible = ref(false)

watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestroy()
  }
})

defineOptions({
  name: 'VKMessage',
})

const startTimer = () => {
  if (props.duration === 0) return
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

onMounted(() => {
  visible.value = true
  startTimer()
})
</script>
<style>
.vk-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
