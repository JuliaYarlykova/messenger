import { ChatLine } from '@/entities/Chat'
import { Page } from '@/widgets/Page'
import { memo } from 'react'

import cls from './MainPage.module.scss'
import { ChatPart } from '../ChatPart/ChatPart'

const MainPage = () => (
  <Page className={cls.page}>
    <ChatLine name="Ярлыкова Юлия" />
    <ChatPart />
  </Page>
)

export default memo(MainPage)
