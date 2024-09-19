import { Button, Input, Modal } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import cls from './UpdateProfile.module.scss'
import { Controller, useForm } from 'react-hook-form'
import {
  editProfileSchema,
  FormInputData,
  FormOutputData,
} from '../lib/EditProfileScheme'
import { useCallback, useEffect } from 'react'

interface UpdateProfileProps {
  isOpen: boolean
  setOpen: () => void
}

export const UpdateProfile = (props: UpdateProfileProps) => {
  const { isOpen, setOpen } = props

  const {
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormInputData, any, FormOutputData>({
    defaultValues: {
      name: '',
      date: '',
      email: '',
      city: '',
    },
    resolver: zodResolver(editProfileSchema),
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  const onSubmit = useCallback(async (data) => {}, [])
  return (
    <Modal isOpen={isOpen} onClose={setOpen}>
      <form className={cls.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={cls.title}>Редактирование профиля</h2>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Имя"
              size="l"
              errorMessage={errors.name?.message}
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.name) trigger('name')
              }}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Дата рождения"
              size="l"
              errorMessage={errors.name?.message}
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.name) trigger('date')
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Почта"
              size="l"
              errorMessage={errors.name?.message}
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.name) trigger('email')
              }}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Город"
              size="l"
              errorMessage={errors.name?.message}
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.name) trigger('city')
              }}
            />
          )}
        />
        <Button>Сохранить изменения</Button>
      </form>
    </Modal>
  )
}
