import type { CreateMessageProps, MessageContext } from './types'
import { render, h, shallowReactive } from 'vue'
import Message from './Message.vue'
import useZIndex from '../../hooks/useZIndex'

let seed = 1

const instances: MessageContext[] = shallowReactive([])

/**
 * 创建一个消息提示组件并将其添加到页面中。
 *
 * @param message - 消息提示组件的属性，类型为 MessageProps。
 */
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  // 创建一个新的 div 元素，用于作为虚拟节点的挂载容器
  const container = document.createElement('div')
  // 使用 Vue 的 h 函数创建一个 Message 组件的虚拟节点，并传入 message 属性

  const destroy = () => {
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }

  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    id,
    onDestroy: destroy,
    zIndex: nextZIndex()
  }

  const vnode = h(Message, newProps)
  // 将虚拟节点渲染到之前创建的 div 容器中
  render(vnode, container)
  // 将渲染好的组件的第一个子元素添加到页面的 body 中
  document.body.appendChild(container.firstElementChild!)
  const instance = {
    id,
    vnode,
    props: newProps,
    vm: vnode.component!,
    destroy: manualDestroy
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx <= 0) return 0
  const prev = instances[idx - 1]
  return prev.vm.exposed!.bottomOffset.value
}
