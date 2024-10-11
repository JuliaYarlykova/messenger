import { zodResolver } from '@hookform/resolvers/zod'

import { memo, useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
  AuthorizationFormSchema,
  authorizationFormSchema,
} from '../lib/AuthorisationScheme'

import cls from './AuthorisationForm.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, Button, Card, Input } from '@/shared/ui'
import { useSelector } from 'react-redux'
import { getLoginState } from '../model/selectors/getLoginState'

export interface AuthorizationFormProps {
  className?: string
}

export const AuthorizationForm = memo((props: AuthorizationFormProps) => {
  const { className } = props
  const [showPassword] = useState(false)
  const { email, password, error, isLoading } = useSelector(getLoginState)

  const {
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<AuthorizationFormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authorizationFormSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<AuthorizationFormSchema> = useCallback(() => {
    reset()
  }, [reset])

  return (
    <Card
      className={classNames(cls.AuthorizationForm, {}, [className])}
      variant="light"
      padding="32"
    >
      <p title="Авторизация" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={cls.form}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="email"
              size="l"
              type="email"
              errorMessage={errors.email?.message}
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.email) trigger('email')
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="l"
              type={showPassword ? 'text' : 'password'}
              errorMessage={errors.password?.message}
              placeholder="Пароль"
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.password) trigger('password')
              }}
            />
          )}
        />
        <AppLink to="/" className={cls.link}>
          Забыли пароль?
        </AppLink>
        <Button type="submit" disabled={!isValid} className={cls.form_button}>
          Войти
        </Button>
      </form>
    </Card>
  )
})
