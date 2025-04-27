<template>
  <div class="vk-input" :class="{
    [`vk-input--${type}`]: type,
    [`vk-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus': isFocus
  }">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="vk-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="vk-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
        </span>
        <input v-model="innerValue" @input="handleInput" @focus="handleFocus" @blur="handleBlur" class="vk-input__inner" :type="type" :disabled="disabled" />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear" class="vk-input__suffix">
          <slot name="suffix" />
          <Icon v-if="showClear" class="vk-input__clear" icon="circle-xmark" @click="clear" />
        </span>
      </div>
      <!-- append -->
      <div v-if="$slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea v-model="innerValue" @input="handleInput" @focus="handleFocus" @blur="handleBlur" class="vk-textarea__wrapper" :disabled="disabled" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue"
defineOptions({
  name: 'VKInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)
const isFocus = ref(false)

const showClear = computed(() => {
  return props.clearable && !props.disabled && !!innerValue.value && isFocus.value
})

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}
const handleFocus = () => {
  isFocus.value = true
}
const handleBlur = () => {
  isFocus.value = false
}

const clear = ()=>{
  innerValue.value = ''
  emits('update:modelValue', '')
}
</script>
