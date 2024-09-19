import { ChatCard } from '@/entities/Chat'
import { Card } from '@/shared/ui'

import cls from './Sidebar.module.scss'

const chats = [
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
]

export const Sidebar = () => {
  return (
    <Card variant="light">
      <div className={cls.card}>
        {chats &&
          chats.map((chat, key) => (
            <div className="" key={key}>
              <ChatCard chatCardInfo={chat} />
            </div>
          ))}
      </div>
    </Card>
  )
}
