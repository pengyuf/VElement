<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, watch } from "vue";
import type { NameType, CollapseEmits, CollapseProps } from "./types.ts";
import { collapseContextKey } from "./types.ts";

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

defineOptions({
  name: "VKCollapse",
});

watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);

const activeNames = ref<NameType[]>(props.modelValue);

const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? "" : item];
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(item);
    }
  }
  emits("update:modelValue", activeNames.value);
  emits("change", activeNames.value);
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>
<style></style>
