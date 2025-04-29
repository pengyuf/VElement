<template>
  <div class="vk-select" :class="{
    'is-disabled': disabled,
  }" @click="toggleDropdown">
    <Tooltip placement="bottom-start" manual ref="toolTipRef">
      <Input type="text" v-model="states.inputValue" :disabled="disabled" :placeholder="placeholder" />
      <template #content>
        <ul class="vk-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li class="vk-select__menu-item" :class="{
              'is-disabled': item.disabled,
              'is-selected': states.selectedOption?.value === item.value,
            }" :id="`select-item-${item.value}`" @click.stop="itemSelect(item)">
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
import type { SelectEmits, SelectOption, SelectProps, SelectStates } from './types'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';

import { reactive, ref, type Ref } from 'vue';

defineOptions({
  name: 'VkSelect'
})

const findOption = (value: string) => {
  const option = props.options.find(item => item.value === value)
  return option || null
}

const props = defineProps<SelectProps>()

const initalOption = findOption(props.modelValue)

const emits = defineEmits<SelectEmits>()

const states = reactive<SelectStates>({
  inputValue: initalOption ? initalOption.label : '',
  selectedOption: initalOption
})
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

const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.selectedOption = e
  states.inputValue = e.label
  emits('update:modelValue', e.value)
  emits('change', e.value)
  controlDropdown(false)
}
</script>
