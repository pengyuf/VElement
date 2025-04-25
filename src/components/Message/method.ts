import type { CreateMessageProps } from './types'
import { render, h } from 'vue'
import Message from './Message.vue'

/**
 * 创建一个消息提示组件并将其添加到页面中。
 *
 * @param message - 消息提示组件的属性，类型为 MessageProps。
 */
export const createMessage = (props: CreateMessageProps) => {
  // 创建一个新的 div 元素，用于作为虚拟节点的挂载容器
  const container = document.createElement('div')
  // 使用 Vue 的 h 函数创建一个 Message 组件的虚拟节点，并传入 message 属性

  const destroy = () => {
    // 这行代码使用 Vue 的 render 函数，将 null 作为虚拟节点传入，将其渲染到 container 容器中。
    // 其作用是销毁之前渲染到 container 容器中的组件，清除容器内的内容。
    render(null, container)
  }

  const newProps = {
    ...props,
    onDestroy: destroy
  }

  const vnode = h(Message, newProps)
  // 将虚拟节点渲染到之前创建的 div 容器中
  render(vnode, container)
  // 将渲染好的组件的第一个子元素添加到页面的 body 中
  document.body.appendChild(container.firstElementChild!)
}
