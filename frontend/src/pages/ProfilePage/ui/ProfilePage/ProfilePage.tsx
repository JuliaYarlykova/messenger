import { Button } from '@/shared/ui'
import { Page } from '@/widgets/Page'
import { memo, useState } from 'react'
import { AvatarPart } from '../AvatarPart/AvatarPart'
import { PersonalInfo } from '../PersonalInfo/PersonalInfo'

import cls from './profilePage.module.scss'
import { UpdateProfile } from '@/features/UpdateProfile'
import { getMetrics } from '../../api/getProfile'
import { PageLoader } from '@/widgets/PageLoader'

const ProfilePage = () => {
  const [isOpen, setOpen] = useState(false)
  const { data: user, isLoading, isError } = getMetrics({ id: 4 })
  if (isLoading) return <PageLoader />
  if (!user || isError) {
    return <p>"Произошла ошибка при загрузке данных" </p>
  }

  return (
    <Page className={cls.page}>
      <Button className={cls.button} onClick={() => setOpen(true)}>
        Редактировать
      </Button>
      <AvatarPart
        name={user.nickname}
        status={user.status}
        img={user.imagePath?.split('\\')[1]}
      />
      <PersonalInfo
        city={'Томск'}
        birthday={user.birthday}
        aducation={'ТУСУР'}
      />
      <UpdateProfile isOpen={isOpen} setOpen={() => setOpen(false)} />
    </Page>
  )
}

export default memo(ProfilePage)
