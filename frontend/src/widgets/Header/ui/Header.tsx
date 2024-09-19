import { AppLink, Card } from '@/shared/ui'

import cls from './Header.module.scss'

export const Header = () => {
  return (
    <Card className={cls.card} variant="light" padding="8">
      <AppLink variant="round" to={'/profile'}>
        <span className="material-symbols-outlined">person</span>
      </AppLink>
    </Card>
  )
}
