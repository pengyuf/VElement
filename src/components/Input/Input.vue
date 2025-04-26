<template>
  <div class="vk-input" :class="{
    [`vk-input--${type}`]: type,
    [`vk-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
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
        <input v-model="innerValue" @input="handleInput" class="vk-input__inner" :type="type" :disabled="disabled" />
        <!-- suffix slot -->
        <span v-if="$slots.suffix" class="vk-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
      <!-- append -->
      <div v-if="$slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea v-model="innerValue" @input="handleInput" class="vk-textarea__wrapper" :disabled="disabled" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { InputProps, InputEmits } from "./types";

defineOptions({
  name: 'VKInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}
</script>
