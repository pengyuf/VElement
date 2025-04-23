import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'
import { h } from 'vue'
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(() => h(Collapse, {
      modelValue: [],
      onChange: onChange,
      accordion: true
    }, [
      h(CollapseItem, { name: "a", title: "title a" }, "content a"),
      h(CollapseItem, { name: "b", title: "title b" }, "content b"),
      h(CollapseItem, { name: "c", title: "title c", disabled: true }, "content c")
    ]), {
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })
    headers = wrapper.findAll('.vk-collapse-item__header')
    contents = wrapper.findAll('.vk-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    firstContent = contents[0]
    secondContent = contents[1]
  })
  test('手风琴模式', async () => {
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
})
