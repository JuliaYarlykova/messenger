import { Button } from '@/shared/ui'
import { Page } from '@/widgets/Page'
import { memo, useContext, useState } from 'react'
import { AvatarPart } from '../AvatarPart/AvatarPart'
import { PersonalInfo } from '../PersonalInfo/PersonalInfo'

import cls from './profilePage.module.scss'
import { UpdateProfile } from '@/features/UpdateProfile'
import { AuthContext } from '@/shared/lib/hooks/useContext'

const ProfilePage = () => {
  const [isOpen, setOpen] = useState(false)
  const user = useContext(AuthContext)
  if (!user) return null
  return (
    <Page className={cls.page}>
      <Button className={cls.button} onClick={() => setOpen(true)}>
        Редактировать
      </Button>
      <AvatarPart name={user.name} />
      <PersonalInfo
        city={user.city}
        birthday={user.birthday}
        aducation={user.aducation}
      />
      <UpdateProfile isOpen={isOpen} setOpen={() => setOpen(false)} />
    </Page>
  )
}

export default memo(ProfilePage)
