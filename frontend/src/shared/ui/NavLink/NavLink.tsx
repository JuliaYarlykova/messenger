import { classNames } from '@/shared/lib/classNames/classNames'
import { ReactNode } from 'react'
import { LinkProps, NavLink } from 'react-router-dom'

import cls from './NavLink.module.scss'

type Variant = 'normal' | 'round'

interface ButtonProps extends LinkProps {
  children?: ReactNode
  className?: string
  variant?: Variant
}
export const AppLink = (props: ButtonProps) => {
  const { children, className, variant = 'normal', to } = props
  return (
    <NavLink
      className={classNames(cls.link, {}, [className, cls[variant]])}
      to={to}
    >
      {children}
    </NavLink>
  )
}
