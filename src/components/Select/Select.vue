<template>
  <div class="vk-select" :class="{
    'is-disabled': disabled,
  }" @click="toggleDropdown" @mouseenter="states.mouseHover = true" @mouseleave="states.mouseHover = false">
    <Tooltip placement="bottom-start" manual ref="toolTipRef" :popper-options="popperOptions"
      @click-outside="controlDropdown(false)">
      <Input ref="inputRef" type="text" v-model="states.inputValue" :readonly="!filterable || !isDropdownShow" :disabled="disabled"
        :placeholder="filteredPlaceholder" @input="onFilter">
      <template #suffix>
        <Icon v-if="showClearIcon" class="vk-input__clear" icon="circle-xmark" @mousedown.prevent="NOOP"
          @click="onClear" />
        <Icon v-else icon="angle-down" class="header-angle" :class="{ 'is-active': isDropdownShow }" />
      </template>
      </Input>
      <template #content>
        <ul class="vk-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li class="vk-select__menu-item" :class="{
              'is-disabled': item.disabled,
              'is-selected': states.selectedOption?.value === item.value,
            }" :id="`select-item-${item.value}`" @click.stop="itemSelect(item)">
              <RenderVnode :vnode="renderLabel ? renderLabel(item) : item.label" />
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
import type { InputInstance } from '../Input/types'
import { isFunction } from 'lodash-es'
import Input from '../Input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Icon from '../Icon/Icon.vue';
import RenderVnode from "../Common/RenderVnode"

import { computed, reactive, ref, watch, type Ref } from 'vue';

defineOptions({
  name: 'VkSelect'
})

const findOption = (value: string) => {
  const option = props.options.find(item => item.value === value)
  return option || null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}

const props = defineProps<SelectProps>()

const initalOption = findOption(props.modelValue)

const emits = defineEmits<SelectEmits>()

const filteredOptions = ref(props.options)

watch(() => props.options, (newOptions) => {
  filteredOptions.value = newOptions
})

const states = reactive<SelectStates>({
  mouseHover: false,
  inputValue: initalOption ? initalOption.label : '',
  selectedOption: initalOption
})
const toolTipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>

const isDropdownShow = ref(false)

const showClearIcon = computed(() => {
  return props.clearable && states.mouseHover && states.inputValue.trim() && states.selectedOption
})

const NOOP = () => { }

const filteredPlaceholder = computed(() => {
  return (props.filterable && states.selectedOption && isDropdownShow.value) ? states.selectedOption.label : props.placeholder
})

const controlDropdown = (show: boolean) => {
  if (show) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    if (props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    toolTipRef.value?.show()
  } else {
    toolTipRef.value?.hide()
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
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
  inputRef.value?.ref.focus()
}

const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('update:modelValue', '')
  emits('change', '')
  emits('clear')
}

const generateFilterOptions = (searchValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else {
    filteredOptions.value = props.options.filter(option => option.label.includes(searchValue))
  }
}

const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
</script>
