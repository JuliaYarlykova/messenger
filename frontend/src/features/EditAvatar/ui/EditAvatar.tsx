import { Avatar, Input } from '@/shared/ui'

import cls from './editAvatar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useRef } from 'react'

interface EditAvatarProps {
  img?: string
}

export const EditAvatar = (props: EditAvatarProps) => {
  const { img } = props
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className={cls.wrapper}>
      <Avatar src={img} size={350} />
      <label htmlFor="" className={cls.label}>
        <Input type="file" className={cls.input} ref={ref} />
        <span
          className={classNames('material-symbols-outlined', {}, [cls.edit])}
        >
          edit
        </span>
      </label>
    </div>
  )
}
