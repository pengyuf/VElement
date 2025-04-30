import type { VNode } from "vue";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomRemoteFilterFunc = (value: string) => Promise<SelectOption[]>

export interface SelectProps {
  options?: SelectOption[];
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomRemoteFilterFunc;
}

export interface SelectStates {
  mouseHover: boolean;
  inputValue: string;
  selectedOption: SelectOption | null;
  loading: boolean;
}

export interface SelectEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'visible-change', value: boolean): void;
  (e: 'clear'): void;
}
