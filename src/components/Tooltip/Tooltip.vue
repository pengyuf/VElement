<template>
  <div class="vk-tooltip" v-on="outEvents" ref="popperContainerNode">
    <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div class="vk-tooltip__popper" v-if="isOpen" ref="popperNode">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { createPopper } from "@popperjs/core";
import type { Instance } from "@popperjs/core";
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { computed, defineProps, onUnmounted, reactive, ref, watch } from "vue";
import useClickOutside from "@/hooks/useClickOutside";

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click',
  transition: 'fade',
  openDelay: 1000,
  closeDelay: 1000,
})
const emits = defineEmits<TooltipEmits>();
defineOptions({
  name: "VKTooltip",
});

const isOpen = ref<boolean>(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let events: Record<string, any> = reactive({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let outEvents: Record<string, any> = reactive({})
const popperOptions = computed(() => {
  // 这样做的目的是将组件传入的 `popperOptions` 与固定的 `placement` 属性合并，作为最终的 popper 配置选项。
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions
  }
})


let popperInstance: Instance | null = null;


useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}

const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const attachEvent = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

if (!props.manual) {
  attachEvent()
}

watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outEvents = {}
  } else {
    attachEvent()
  }
})

watch(() => props.trigger, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    events = {}
    outEvents = {}
    attachEvent()
  }
})

watch(() => isOpen.value, (newVal) => {
  if (newVal) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
    } else {
      popperInstance?.destroy()
    }
  }
}, {
  flush: 'post'
})

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
})

onUnmounted(() => {
  popperInstance?.destroy()
})
</script>
