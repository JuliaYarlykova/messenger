import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui'
import { ReactNode } from 'react'

import cls from './Page.module.scss'

interface PageProps {
  children: ReactNode
  className?: string
}

export const Page = (props: PageProps) => {
  const { children, className } = props
  return (
    <main className={cls.main}>
      <Card
        className={classNames(cls.card, {}, [className])}
        variant="light"
        padding="0"
      >
        {children}
      </Card>
    </main>
  )
}
