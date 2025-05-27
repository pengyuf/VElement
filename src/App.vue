<script setup lang="ts">
import { ref, h, onMounted, reactive } from "vue";

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
import Form from "./components/Form/Form.vue";
import FormItem from "./components/Form/FormItem.vue";
import { createMessage } from "./components/Message/method";

const inputValue = ref("test");
const switchValue = ref(false);
const selectValue = ref("");

const formModel = reactive({
  email: '',
  password: ''
})
const formRules = {
  email: [
    { required: true, type: 'email', trigger: 'blur' },
    { required: true, type: 'string', trigger: 'input' },
  ],
  password: [
    { required: true, type: 'string', trigger: 'blur' },
  ]
}
const formRef = ref()
const validateForm = ()=>{
  formRef.value?.validate()
}

const selectOptions: SelectOption[] = [
  { label: "hello", value: "1" },
  { label: "test", value: "2" },
  { label: "dom", value: "3" },
  { label: "it", value: "4", disabled: true },
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
    <Select placeholder="请输入" v-model="selectValue" clearable :options="selectOptions" filterable />
  </div>
  <div>
    <Form ref="formRef" :model="formModel" :rules="formRules">
      <FormItem label="email" prop="email">
        <Input type="text" placeholder="请输入" v-model="formModel.email" />
      </FormItem>
      <FormItem label="password" prop="password">
        <Input type="password" placeholder="请输入" v-model="formModel.password" />
      </FormItem>
      <div>
        <Button type="primary">Submit</Button>
        <Button>reset</Button>
      </div>
    </Form>
    <button @click.prevent="validateForm">整体验证</button>
  </div>
</template>

<style></style>
