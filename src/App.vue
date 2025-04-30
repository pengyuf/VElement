<script setup lang="ts">
import { ref, h, onMounted } from "vue";

import type { SelectOption } from "./components/Select/types";

import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import Alert from "./components/Alert/Alert.vue";
import Input from "./components/Input/Input.vue";
import Switch from "./components/Switch/Switch.vue";
import Select from "./components/Select/Select.vue";
import { createMessage } from "./components/Message/method";

const inputValue = ref("test");
const switchValue = ref(false);
const selectValue = ref("1");

const selectOptions: SelectOption[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option disabled", value: "4", disabled: true },
]

const openedValue = ref(["a"]);
const menuOptions = [
  { label: h('div', 'vnode option'), key: '1' },
  { label: 'Option 2', key: '2' },
  { label: 'Option 3', key: '3' },
  { label: 'Option 4', key: '4', divided: true },
  { label: 'Option 5', key: '5', disabled: true },
]

onMounted(() => {
  createMessage({
    message: 'hello world',
    type: 'info',
    duration: 3000,
  })
  createMessage({
    message: 'hello world 22222',
    duration: 0,
    showClose: true,
    type: 'success',
  })
  createMessage({
    message: 'hello world 333333333',
    type: 'info',
    duration: 0,
  })
})

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
  <div>
    <Alert title="alert info" />
    <Alert title="dark主题" type="success" effect="dark" />
    <Alert title="不可关闭" type="warning" :closable="false" />
    <Alert title="自定义关闭按钮" type="error" effect="dark" close-text="关闭" />
    <Alert title="展示图标" show-icon />
    <Alert title="文字居中" show-icon center />
    <Alert title="文字描述" description="这是描述字段" show-icon />
  </div>
  <div>
    <Input type="text" placeholder="请输入" v-model="inputValue" />
  </div>
  <div>
    <Switch v-model="switchValue" />
    <Switch v-model="switchValue" active-text="on" inactive-text="off" />
  </div>
  <div>
    <Select placeholder="请输入" v-model="selectValue" clearable :options="selectOptions" />
  </div>
</template>

<style></style>
