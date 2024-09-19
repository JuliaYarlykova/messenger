import { HTMLAttributes, memo, ReactNode } from 'react'

import cls from './Card.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

export type CardVariant = 'default' | 'outlined' | 'light'
export type CardPadding = '0' | '4' | '8' | '16' | '24' | '32'
export type CardBorder = 'none' | 'round' | 'normal' | 'partial'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  variant?: CardVariant
  max?: boolean
  padding?: CardPadding
  border?: CardBorder
  cardRef?: React.RefObject<HTMLDivElement>
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '4': 'gap_4',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
  '32': 'gap_32',
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    padding = '16',
    children,
    max,
    variant = 'default',
    border = 'normal',
    cardRef,
    ...otherProps
  } = props

  const paddingClass = mapPaddingToClass[padding]

  return (
    <div
      ref={cardRef}
      className={classNames(cls.Card, { [cls.max]: max }, [
        className,
        cls[variant],
        cls[paddingClass],
        cls[border],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  )
})
