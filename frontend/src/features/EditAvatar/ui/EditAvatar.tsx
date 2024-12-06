import { Avatar, Button, Input } from '@/shared/ui'

import cls from './editAvatar.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useRef } from 'react'
import { deleteAvatar, postAvatar } from '../api/editAvatar'

interface EditAvatarProps {
  img?: string
}

export const EditAvatar = (props: EditAvatarProps) => {
  const { img } = props
  const ref = useRef<HTMLInputElement>(null)
  const [editAvatar] = postAvatar()
  const [delAvatar] = deleteAvatar()

  const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const data = {
        file: file,
      }
      editAvatar(data)
    }
  }
  if (!img)
    return (
      <div className={cls.wrapper}>
        <div className="">загрузить изображение</div>

        <label htmlFor="" className={cls.label}>
          <Input
            type="file"
            className={cls.input}
            ref={ref}
            onChange={(e) => changeAvatar(e)}
          />
          <span
            className={classNames('material-symbols-outlined', {}, [cls.edit])}
          >
            edit
          </span>
        </label>
      </div>
    )

  const handlerDelAvatar = () => {
    delAvatar(null)
  }
  return (
    <div className={cls.wrapper}>
      <Avatar src={img} size={250} />
      <label htmlFor="" className={cls.label}>
        <Input
          type="file"
          className={cls.input}
          ref={ref}
          onChange={(e) => changeAvatar(e)}
        />
        <span
          className={classNames('material-symbols-outlined', {}, [cls.edit])}
        >
          edit
        </span>
      </label>

      <Button className={cls.label_delete} onClick={handlerDelAvatar}>
        <span
          className={classNames('material-symbols-outlined', {}, [cls.delete])}
        >
          delete
        </span>
      </Button>
    </div>
  )
}
