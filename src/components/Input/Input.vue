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
        <input ref="inputRef" :type="showPassword ? (showPasswordVisible ? 'text' : 'password') : type"
          v-model="innerValue" v-bind="attr" :disabled="disabled" :placeholder="placeholder" :readonly="readonly"
          :autocomplete="autocomplete" :autofocus="autofocus" :form="form" @change="handleChange" @input="handleInput"
          @focus="handleFocus" @blur="handleBlur" class="vk-input__inner" />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="vk-input__suffix" @click="keepFocus">
          <slot name="suffix" />
          <Icon v-if="showClear" class="vk-input__clear" icon="circle-xmark" @click="clear" @mousedown.prevent="NOOP" />
          <Icon @click="togglePasswordVisible" v-if="showPasswordArea && showPasswordVisible" class="vk-input__password"
            icon="eye" />
          <Icon @click="togglePasswordVisible" v-if="showPasswordArea && !showPasswordVisible"
            class="vk-input__password" icon="eye-slash" />
        </span>
      </div>
      <!-- append -->
      <div v-if="$slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea ref="inputRef" v-model="innerValue" v-bind="attr" :disabled="disabled" :placeholder="placeholder"
        :readonly="readonly" :autocomplete="autocomplete" :autofocus="autofocus" :form="form" @change="handleChange"
        @input="handleInput" @focus="handleFocus" @blur="handleBlur" class="vk-textarea__wrapper" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, ref, useAttrs, watch, type Ref } from "vue";
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue"
import { formItemContextKey } from "../Form/types";
defineOptions({
  name: 'VKInput',
  inheritAttrs: false,
})


const attr = useAttrs()

const inputRef = ref() as Ref<HTMLInputElement>

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})
const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const showPasswordVisible = ref(false)

const NOOP = () => { }

// 表单验证
const formItemContext = inject(formItemContextKey)
const runValidate = (trigger?: string) => {
  formItemContext?.validate(trigger)
}


const showClear = computed(() => {
  return props.clearable && !props.disabled && !!innerValue.value && isFocus.value
})
const showPasswordArea = computed(() => {
  return props.showPassword && !props.disabled && !!innerValue.value
})

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

const keepFocus = async () => {
  await nextTick()
  inputRef.value?.focus()
}

const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  runValidate('input')
}

const handleChange = () => {
  emits('change', innerValue.value)
  runValidate('change')
}

const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits('blur', event)
  runValidate('blur')
}

const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('change', '')
  emits('input', '')
}

const togglePasswordVisible = () => {
  showPasswordVisible.value = !showPasswordVisible.value
}

defineExpose({
  ref: inputRef
})
</script>
