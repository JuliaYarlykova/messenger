import { Avatar, Card } from '@/shared/ui'

import cls from './ChatLine.module.scss'

interface ChatLine {
  img?: string
  name?: string
}

export const ChatLine = (props: ChatLine) => {
  const { img, name } = props
  return (
    <Card className={cls.card} padding="4">
      <Avatar src={img} size={50} />
      <p>{name}</p>
    </Card>
  )
}
