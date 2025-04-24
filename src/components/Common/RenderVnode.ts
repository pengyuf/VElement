import { defineComponent } from "vue";

// 定义一个名为 RenderVnode 的 Vue 组件
const RenderVnode = defineComponent({
  // 定义组件的 props
  props: {
    // 定义 vnode 属性，其类型可以是字符串或对象，并且是必填项
    vnode: {
      type: [String, Object],
      required: true
    }
  },
  // 组件的 setup 函数，用于组合式 API
  setup(props) {
    // 返回一个渲染函数，直接返回传入的 vnode
    return () => props.vnode
  },
})

export default RenderVnode
