import { AppLink, Avatar, Button } from '@/shared/ui'

import cls from './ChatCard.module.scss'
import { MiniChat } from '../lib/types/chat'
import { useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ChatCardProps {
  chatCardInfo: MiniChat
}

export const ChatCard = (props: ChatCardProps) => {
  const { chatCardInfo } = props
  const [isShow, setShow] = useState(false)

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <AppLink className={cls.chat} to={'/'}>
        <Avatar size={43} />
        <div className={cls.info}>
          <h3 className={cls.title}>{chatCardInfo.title}</h3>
          <p className={cls.last}>{chatCardInfo.lastMessage}</p>
        </div>
        {isShow && (
          <Button variant="ghost">
            <span
              className={classNames('material-symbols-outlined', {}, [
                cls.delete,
              ])}
            >
              delete
            </span>
          </Button>
        )}
      </AppLink>
    </div>
  )
}
