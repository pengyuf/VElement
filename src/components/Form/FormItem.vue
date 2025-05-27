<template>
  <div class="vk-form-item" :class="{
    'is-success': validateStatus.status === 'success',
    'is-error': validateStatus.status === 'error',
    'is-loading': validateStatus.loading
  }">
    <label class="vk-form-item__lable">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="vk-form-item__content">
      <slot />
      <div class="vk-form-item__error-msg" v-if="validateStatus.status == 'error'">
        <span>{{ validateStatus.errorMsg }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue';
import { formItemContextKey, type FormItemContext, formContextKey, type FormItemProps, type FormValidateFailure } from './types'
import Schema from 'async-validator';



const formContext = inject(formContextKey)

const props = defineProps<FormItemProps>()

const validateStatus = reactive({
  status: 'init',
  errorMsg: '',
  loading: false
})


let initialValue: null = null

const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && model[props.prop]) {
    return model[props.prop]
  } else {
    return null
  }
})

const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})


const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}

const validate = (trigger?: string) => {
  const modelName = props.prop
  const triggerRules = getTriggerRules(trigger)
  if (triggerRules.length === 0) return true
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggerRules
    })
    validateStatus.loading = true
    return validator.validate({
      [modelName]: innerValue.value
    }).then(() => {
      console.log('success')
      validateStatus.status = 'success'
    }).catch((e: FormValidateFailure) => {
      console.error(e)
      const { errors } = e
      validateStatus.status = 'error'
      validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
      return Promise.reject(e)
    }).finally(() => {
      validateStatus.loading = false
    })
  }
}

const clearValidate = () => {
  validateStatus.status = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && model[props.prop]) {
    model[props.prop] = initialValue
  }
}

const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  resetField,
  clearValidate,
}
provide(formItemContextKey, context)

onMounted(() => {
  initialValue = innerValue.value
  if (props.prop) {
    formContext?.addField(context)
  }
})

onUnmounted(() => {
  formContext?.removeField(context)
})

defineOptions({
  name: 'VkFormItem'
})

</script>
