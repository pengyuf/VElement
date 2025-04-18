<template>
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "./types";

import { ref } from "vue";

defineOptions({
  name: "VKButton",
});

withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});

const _ref = ref<HTMLButtonElement>();

defineExpose({
  ref: _ref,
});
</script>

<style></style>
