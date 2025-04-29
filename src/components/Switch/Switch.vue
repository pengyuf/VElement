<template>
  <div class="vk-switch" :class="{
    [`vk-switch--${size}`]: size,
    'is-disabled': disabled,
    'is-checked': checked,
  }" @click="switchValue">
    <input ref="input" class="vk-switch__input" type="checkbox" role="switch" :disabled="disabled" :name="name"
      @keydown.enter="switchValue" />
    <div class="vk-switch__core">
      <div class="vk-switch__core-inner">
        <span v-if="activeText || inactiveText" class="vk-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="vk-switch__core-action"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({
  name: 'VkSwitch',
  inheritAttrs: false
})

const props = withDefaults(defineProps<SwitchProps>(), {
  inactiveValue: false,
  activeValue: true,
})

const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)

const input = ref<HTMLInputElement>()

const checked = computed(() => innerValue.value === props.activeValue)

const switchValue = () => {
  if (props.disabled) return
  // 这行代码使用三元运算符来确定切换开关的新值。
  // 如果 checked 的值为 true，意味着开关当前处于开启状态，新值将被设为 props.inactiveValue（关闭状态对应的值）。
  // 如果 checked 的值为 false，意味着开关当前处于关闭状态，新值将被设为 props.activeValue（开启状态对应的值）。
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}

onMounted(() => {
  input.value!.checked = checked.value
})

watch(checked, (value) => {
  input.value!.checked = value
})

watch(() => props.modelValue, (value) => {
  innerValue.value = value
})
</script>
