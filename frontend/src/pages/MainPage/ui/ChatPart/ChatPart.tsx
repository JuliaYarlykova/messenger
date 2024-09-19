import { Button, Input } from '@/shared/ui'

import cls from './ChatPart.module.scss'

export const ChatPart = () => {
  return (
    <section className={cls.section}>
      <div className=""></div>
      <div className={cls.wrapper}>
        <Input placeholder="Message" />
        <Button variant="round">
          <span className="material-symbols-outlined">send</span>
        </Button>
      </div>
    </section>
  )
}
