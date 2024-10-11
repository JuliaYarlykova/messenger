import { EditAvatar } from '@/features/EditAvatar/ui/EditAvatar'
import cls from './AvatarPart.module.scss'
import { getAvatar } from '../../api/getAvatar'
import { useEffect, useState } from 'react'

interface AvatarPartProps {
  img?: string
  name?: string
  status?: boolean
}

export const AvatarPart = (props: AvatarPartProps) => {
  const { img, name, status } = props
  const currStatus = status ? 'Онлайн' : 'Не в сети'
  const { data: avatar, isLoading } = getAvatar(img)
  const [av, setAv] = useState<string>()

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAv(e.target?.result as string)
      }
      reader.readAsDataURL(avatar)
    }
  }, [av, avatar])

  if (isLoading) return <div className="">Loading...</div>
  return (
    <section className={cls.section}>
      <EditAvatar img={av} />
      <div className="">
        <h1 className={cls.text}>{name}</h1>
        <span>{currStatus}</span>
      </div>
    </section>
  )
}
