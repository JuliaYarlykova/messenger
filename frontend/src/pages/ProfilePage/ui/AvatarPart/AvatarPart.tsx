import { Avatar } from '@/shared/ui'

import cls from './AvatarPart.module.scss'

interface AvatarPartProps {
  img?: string
  name?: string
}

export const AvatarPart = (props: AvatarPartProps) => {
  const { img, name } = props
  return (
    <section className={cls.section}>
      <Avatar src={img} size={350} />
      <h1 className={cls.text}>{name}</h1>
    </section>
  )
}
