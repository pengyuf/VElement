export interface InputProps {
  type: string
  modelValue: string
  size?: 'large' | 'small'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e:'input',value:string):void
  (e:'change',value:string):void
  (e:'clear'):void
  (e:'focus',event:FocusEvent):void
  (e:'blur',event:FocusEvent):void
}
