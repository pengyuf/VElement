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
    <button @click.prevent="validate">验证</button>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, reactive } from 'vue';
import { formContextKey, type FormItemProps, type FormValidateFailure } from './types'
import Schema from 'async-validator';



const formContext = inject(formContextKey)

const props = defineProps<FormItemProps>()

const validateStatus = reactive({
  status: 'init',
  errorMsg: '',
  loading: false
})

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

const validate = () => {
  const modelName = props.prop
  if (modelName) {
    const validator = new Schema({
      [modelName]: itemRules.value
    })
    validateStatus.loading = true
    validator.validate({
      [modelName]: innerValue.value
    }).then(() => {
      console.log('success')
      validateStatus.status = 'success'
    }).catch((e: FormValidateFailure) => {
      console.error(e)
      const { errors } = e
      validateStatus.status = 'error'
      validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
    }).finally(() => {
      validateStatus.loading = false
    })
  }
}

defineOptions({
  name: 'VkFormItem'
})

</script>
