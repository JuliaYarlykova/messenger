import { AuthorizationForm } from '@/features/Authorization'
import cls from './AuthPage.module.scss'
import { memo } from 'react'

const AuthPage = () => {
  return (
    <main className={cls.main}>
      <AuthorizationForm />
    </main>
  )
}

export default memo(AuthPage)
