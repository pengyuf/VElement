<template>
  <i class="vk-icon" :class="{ [`vk-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
  </i>
</template>

<script lang="ts" setup>
import { omit } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconProps } from "./types";
import { computed } from "vue";
defineOptions({
  name: "VKIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

const filterProps = computed(() => omit(props, ["color", "type"]));

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>
