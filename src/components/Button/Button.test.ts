import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../Icon/Icon.vue'

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    expect(wrapper.classes()).toContain('vk-button--primary')
    expect(wrapper.get('button').text()).toBe('button')
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeDefined()

    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    const iconEle = wrapper.findComponent(FontAwesomeIcon)
    expect(iconEle.exists()).toBeTruthy()
    expect(iconEle.attributes('icon')).toBe('arrow-up')
  })
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    const iconEle = wrapper.findComponent(Icon)
    expect(iconEle.exists()).toBeTruthy()
    expect(iconEle.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
