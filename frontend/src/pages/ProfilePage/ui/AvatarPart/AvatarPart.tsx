import { EditAvatar } from '@/features/EditAvatar/ui/EditAvatar'
import cls from './AvatarPart.module.scss'

interface AvatarPartProps {
  img?: string
  name?: string
}

export const AvatarPart = (props: AvatarPartProps) => {
  const { img, name } = props
  return (
    <section className={cls.section}>
      <EditAvatar img={img} />
      <h1 className={cls.text}>{name}</h1>
    </section>
  )
}
