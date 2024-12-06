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
import { putProfile } from '../api/updateProfile'

interface UpdateProfileProps {
  isOpen: boolean
  setOpen: () => void
}

export const UpdateProfile = (props: UpdateProfileProps) => {
  const { isOpen, setOpen } = props
  const [updateProfile] = putProfile()
  const {
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormInputData, FormInputData, FormOutputData>({
    defaultValues: {
      name: '',
      date: '',
      about: '',
    },
    resolver: zodResolver(editProfileSchema),
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  const onSubmit = useCallback(
    async (data: FormOutputData) => {
      const queryParams = new URLSearchParams(data).toString()
      await updateProfile(queryParams)
      reset()
      setOpen()
    },
    [reset, setOpen, updateProfile],
  )

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
              errorMessage={errors.date?.message}
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.name) trigger('date')
              }}
            />
          )}
        />
        <Controller
          name="about"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Обо мне"
              size="l"
              errorMessage={errors.about?.message}
              onChange={(event) => {
                field.onChange(event.target.value)
                if (errors.name) trigger('about')
              }}
            />
          )}
        />
        <Button type="submit">Сохранить изменения</Button>
      </form>
    </Modal>
  )
}
