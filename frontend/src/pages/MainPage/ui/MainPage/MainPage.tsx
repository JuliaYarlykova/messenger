import { Page } from '@/widgets/Page'
import { memo } from 'react'

import cls from './MainPage.module.scss'

const MainPage = () => <Page className={cls.page}>Добро пожаловать</Page>

export default memo(MainPage)
