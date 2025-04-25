export type AlertType = 'success' | 'info' | 'warning' | 'error'
export type AlertEffect = 'light' | 'dark'

export interface AlertProps {
  title: string
  type?: AlertType
  effect?: AlertEffect
  closable?: boolean
  closeText?: string
  showIcon?: boolean
  description?: string
  center?: boolean
}

export interface AlertEmits {
  (e: 'close'): void
}
