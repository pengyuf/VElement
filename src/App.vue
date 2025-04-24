<script setup lang="ts">
import { reactive, ref, h } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";

const openedValue = ref(["a"]);
const menuOptions = [
  { label: h('div', 'vnode option'), key: '1' },
  { label: 'Option 2', key: '2' },
  { label: 'Option 3', key: '3' },
  { label: 'Option 4', key: '4', divided: true },
  { label: 'Option 5', key: '5', disabled: true },
]
</script>

<template>
  <div>
    <Button type="primary" plain>Test</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger" disabled>Danger</Button>
    <Button type="danger" loading>loading</Button>
    <Button type="danger" icon="arrow-up">loading</Button>
  </div>
  <div>
    <Collapse v-model="openedValue" accordion>
      <CollapseItem name="a">
        <template #title>
          <h1>slot title</h1>
        </template>
        <div>this is content a aaa</div>
      </CollapseItem>
      <CollapseItem name="b" title="Title B">
        <div>this is bbbbb test</div>
      </CollapseItem>
      <CollapseItem name="c" title="Disabled Title" disabled>
        <div>this is cccc test</div>
      </CollapseItem>
    </Collapse>
  </div>
  <div>
    <Icon icon="user-secret" type="warning" color="red" />
  </div>
  <div>
    <Tooltip placement="bottom" content="bottom">
      <Button type="primary">Tooltip</Button>
    </Tooltip>
  </div>
  <div>
    <Dropdown placement="bottom" :menu-options="menuOptions">
      <Button type="primary">Dropdown</Button>
    </Dropdown>
  </div>
</template>

<style></style>
