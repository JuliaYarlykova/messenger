import { AppLink, Avatar } from '@/shared/ui'
import cls from './ChatCard.module.scss'
import { MiniChat } from '../lib/types/chat'
import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'

interface ChatCardProps {
  chatCardInfo: MiniChat
}

export const ChatCard = (props: ChatCardProps) => {
  const { chatCardInfo } = props

  return (
    <div>
      <AppLink to={`/chatpage/${chatCardInfo.id}`} className={cls.chat}>
        <Avatar size={43} />
        <div className={cls.info}>
          <h3 className={cls.title}>{chatCardInfo.title}</h3>
          <p className={cls.last}>{chatCardInfo.lastMessage}</p>
        </div>
      </AppLink>
    </div>
  )
}
