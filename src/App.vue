<script setup lang="ts">
import { ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";

const openedValue = ref(["a"]);
</script>

<template>
  <div>
    <Button type="primary" plain>Test</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger" disabled>Danger</Button>
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
</template>

<style></style>
