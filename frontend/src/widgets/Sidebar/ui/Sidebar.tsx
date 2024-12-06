import { ChatCard } from '@/entities/Chat'
import { Card } from '@/shared/ui'

import cls from './Sidebar.module.scss'

const chats = [
  {
    id: '1',
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    id: '2',
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    id: '3',
    icon: '',
    title: 'чат ',
    lastMessage: 'сообщение',
  },
  {
    id: '4',
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
