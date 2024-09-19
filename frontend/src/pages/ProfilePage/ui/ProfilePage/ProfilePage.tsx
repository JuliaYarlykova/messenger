import { Button } from '@/shared/ui'
import { Page } from '@/widgets/Page'
import { memo, useState } from 'react'
import { AvatarPart } from '../AvatarPart/AvatarPart'
import { PersonalInfo } from '../PersonalInfo/PersonalInfo'

import cls from './profilePage.module.scss'
import { UpdateProfile } from '@/features/UpdateProfile'

const user = {
  name: 'Ярлыкова Юлия',
  birthday: '25-06-2004',
  img: '',
  city: 'Томск',
  aducation: 'ТУСУР',
}

const ProfilePage = () => {
  const [isOpen, setOpen] = useState(false)
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
