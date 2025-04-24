<template>
  <div class="vk-dropdown">
    <Tooltip :trigger="trigger" :placement="placement" :popper-options="popperOptions" :open-delay="openDelay"
      :close-delay="closeDelay" @visible-change="visibleChange" ref="tooltipRef">
      <slot></slot>
      <template #content>
        <ul class="vk-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li @click="itemClick(item)" :id="`dropdown-item-${item.key}`" class="vk-dropdown__item" :class="{
              'is-disabled': item.disabled,
              'is-divided': item.divided
            }">
              <RenderVnode :vnode="item.label"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownProps, DropdownEmits, DropdownInstance, menuOption } from './types';
import Tooltip from '../Tooltip/Tooltip.vue';
import { ref, type Ref } from 'vue';
import type { TooltipInstance } from '../Tooltip/types';
import RenderVnode from '../Common/RenderVnode';

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emit = defineEmits<DropdownEmits>();

const tooltipRef = ref() as Ref<TooltipInstance>;

defineOptions({
  name: "VKDropdown",
});


const visibleChange = (e: boolean) => {
  emit('visible-change', e)
}

const itemClick = (e: menuOption) => {
  if (e.disabled) return;
  emit('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
}

defineExpose<DropdownInstance>({
  show: tooltipRef.value?.show,
  hide: tooltipRef.value?.hide
})

</script>

<style></style>
