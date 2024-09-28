import { classNames } from '@/shared/lib/classNames/classNames'
import { ButtonHTMLAttributes, ReactNode } from 'react'

import cls from './Button.module.scss'

type Variant = 'normal' | 'round' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  variant?: Variant
}

export const Button = (props: ButtonProps) => {
  const { children, className, variant = 'normal', ...otherProps } = props
  return (
    <button
      className={classNames(cls.button, {}, [className, cls[variant]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
