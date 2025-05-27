/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";
import type { InjectionKey } from "vue";

export interface FormItemProps {
  label: string,
  prop?: string,
}

export interface FormItemRule extends RuleItem {
  trigger?: string
}
export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}


export interface FormContext extends FormProps {
addField:(field:FormItemContext)=>void
removeField:(field:FormItemContext)=>void
}

export interface FormItemContext{
  prop:string
  validate:(trigger?:string)=>any
}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export interface FormInstance {
  validate:()=>Promise<any>
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')

