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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormContext extends FormProps {

}

export interface FormItemContext{
  validate:(trigger?:string)=>any
}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')

