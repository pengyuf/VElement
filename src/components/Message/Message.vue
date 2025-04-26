<template>
  <Transition :name="transitionName" @enter="updateHeight" @after-leave="destroyComponent">
    <div role="alert" class="vk-message" :class="{
      [`vk-message--${type}`]: type,
      'is-close': showClose,
    }" v-show="visible" :style="cssStyle" ref="messageRef" @mouseenter="clearTimer" @mouseleave="startTimer">
      <div class="vk-message__content">
        <slot>
          <RenderVnode :vnode="message" v-if="message" />
        </slot>
      </div>
      <div class="vk-message__close" v-if="showClose">
        <Icon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { MessageProps } from './types'
import Icon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener';

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})

const visible = ref(false)

const messageRef = ref<HTMLDivElement>()
const height = ref(0)

// 上一个实例的最下面的坐标
const lastOffset = computed(() => {
  return getLastBottomOffset(props.id)
})

// 这个实例的top
const topOffset = computed(() => {
  return lastOffset.value + props.offset
})

// 为下一个元素预留的offset
const bottomOffset = computed(() => {
  return height.value + topOffset.value
})

const cssStyle = computed(() => {
  return {
    top: `${topOffset.value}px`,
    zIndex: props.zIndex,
  }
})

// watch(visible, (newVal) => {
//   if (!newVal) {
//     props.onDestroy()
//   }
// })

function destroyComponent() {
  props.onDestroy()
}

function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineOptions({
  name: 'VKMessage',
})

let timer: any

const startTimer = () => {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

function clearTimer() {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})

function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.key === 'Escape') {
    visible.value = false
  }
}

useEventListener(document, 'keydown', keydown)

defineExpose({
  bottomOffset,
  visible
})
</script>
<style></style>
