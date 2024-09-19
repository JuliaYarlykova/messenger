import { AppLink, Avatar } from '@/shared/ui'

import cls from './ChatCard.module.scss'
import { MiniChat } from '../lib/types/chat'

interface ChatCardProps {
  chatCardInfo: MiniChat
}

export const ChatCard = (props: ChatCardProps) => {
  const { chatCardInfo } = props
  return (
    <AppLink className={cls.chat} to={'/'}>
      <Avatar size={60} />
      <div className={cls.info}>
        <h3>{chatCardInfo.title}</h3>
        <p className={cls.last}>{chatCardInfo.lastMessage}</p>
      </div>
    </AppLink>
  )
}
