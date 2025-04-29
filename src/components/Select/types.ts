export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    options: SelectOption[];
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
}

export interface SelectStates{
  inputValue: string;
  selectedOption: SelectOption | null;
}

export interface SelectEmits {
    (e: 'update:modelValue', value: string): void;
    (e:'change', value: string): void;
    (e:'visible-change', value: boolean): void;
}
