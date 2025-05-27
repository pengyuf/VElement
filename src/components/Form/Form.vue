<template>
  <form class="vk-form">
    <slot />
  </form>
</template>
<script lang="ts" setup>
import type { FormItemContext, FormProps, FormValidateFailure, FormInstance } from './types'
import type { ValidateFieldsError } from "async-validator";
import { formContextKey } from './types';
import { provide } from 'vue';

const props = defineProps<FormProps>()

const fields: FormItemContext[] = []
const addField = (field: FormItemContext) => {
  fields.push(field)
}
const removeField = (field: FormItemContext) => {
  if (field.prop) {
    const index = fields.indexOf(field)
    if (index > -1) {
      fields.splice(index, 1)
    }
  }
}

const validate = async () => {
  let validationErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if(Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}

provide(formContextKey, { ...props, addField, removeField })

defineOptions({
  name: 'VkForm'
})

defineExpose<FormInstance>({
  validate
})

</script>
