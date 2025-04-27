import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: ''
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      }
    })
    // console.log(wrapper.html())
    expect(wrapper.classes()).toContain('vk-input--small')
    expect(wrapper.classes()).toContain('is-prepend')

    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.vk-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.vk-input__prefix').text()).toBe('prefix')
  })

  it('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    })
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')

    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    await wrapper.setProps({ modelValue: 'prop update' })
    expect(input.element.value).toBe('prop update')
  })

  it('支持点击清空', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        clearable: true,
      },
      global: {
        stubs: ['Icon']
      }
    })
    expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.find('.vk-input__clear').exists()).toBeTruthy()
    await wrapper.get('.vk-input__clear').trigger('click')
    expect(input.element.value).toBe('')
  })
})
