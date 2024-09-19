import { ReactNode } from 'react'

import cls from './InfoLine.module.scss'

interface InfoLine {
  icon?: ReactNode
  info?: string
}

export const InfoLine = (props: InfoLine) => {
  const { icon, info } = props
  return (
    <div className={cls.line}>
      <div>{icon}</div>
      <p className={cls.text}>{info}</p>
    </div>
  )
}
