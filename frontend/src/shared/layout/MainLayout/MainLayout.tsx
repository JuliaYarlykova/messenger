import { ReactNode } from 'react'

import cls from './MainLayout.module.scss'

interface MainLayoutProps {
  children: ReactNode
  header: ReactNode
  sidebar: ReactNode
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children, header, sidebar } = props
  return (
    <div className={cls.MainLayout}>
      <div className={cls.header}>{header}</div>
      <div className={cls.sidebar}>{sidebar}</div>
      <div className={cls.children}>{children}</div>
    </div>
  )
}
