import { zodResolver } from '@hookform/resolvers/zod'

import { memo, useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
  AuthorizationFormSchema,
  authorizationFormSchema,
} from '../lib/AuthorisationScheme'

import cls from './AuthorisationForm.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, Card, Input } from '@/shared/ui'
import { useSelector } from 'react-redux'
import { getLoginState } from '../model/selectors/getLoginState'
import { loginActions } from '../model/slice/loginSlice'
import { login } from '../model/services/login'
import { useAppDispatch } from '@/shared/lib/hooks/useContext'

export interface AuthorizationFormProps {
  className?: string
}

export const AuthorizationForm = memo((props: AuthorizationFormProps) => {
  const { className } = props
  const [showPassword] = useState(false)
  const { email, password } = useSelector(getLoginState)

  const dispatch = useAppDispatch()

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setEmail(value))
    },
    [dispatch],
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch],
  )

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

  const onLoginClick = useCallback(() => {
    dispatch(login({ email, password }))
  }, [dispatch, email, password])

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
                onChangeEmail(event.target.value)
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
                onChangePassword(event.target.value)
                if (errors.password) trigger('password')
              }}
            />
          )}
        />
        <Button
          type="submit"
          disabled={!isValid}
          className={cls.form_button}
          onClick={onLoginClick}
        >
          Войти
        </Button>
      </form>
    </Card>
  )
})
