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
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? "" : item];
    activeNames.value = _activeNames;
  } else {
    const index = _activeNames.indexOf(item);
    if (index > -1) {
      // 存在则删除
      _activeNames.splice(index, 1);
    } else {
      // 不存在则添加
      _activeNames.push(item);
    }
    activeNames.value = _activeNames;
  }
  emits("update:modelValue", _activeNames);
  emits("change", _activeNames);
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>
<style></style>
