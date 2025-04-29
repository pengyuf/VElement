<template>
  <div class="vk-select" :class="{
    'is-disabled': disabled,
  }" @click="toggleDropdown">
    <Tooltip placement="bottom-start" manual ref="toolTipRef">
      <Input type="text" v-model="innerValue" :disabled="disabled" :placeholder="placeholder" />
      <template #content>
        <ul class="vk-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li class="vk-select__menu-item" :class="{
              'is-disabled': item.disabled,
            }" :id="`select-item-${item.value}`">{{ item.label }}</li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
import type { SelectEmits, SelectProps } from './types'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';

import { ref, type Ref } from 'vue';

defineOptions({
  name: 'VkSelect'
})

const props = defineProps<SelectProps>()

const emits = defineEmits<SelectEmits>()

const innerValue = ref('')

const toolTipRef = ref() as Ref<TooltipInstance>

const isDropdownShow = ref(false)

const controlDropdown = (show: boolean) => {
  if (show) {
    toolTipRef.value?.show()
  } else {
    toolTipRef.value?.hide()
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}

const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
</script>
