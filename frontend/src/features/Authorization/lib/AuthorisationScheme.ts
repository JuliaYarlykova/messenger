import { z } from 'zod'

export const authorizationFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Необходимо заполнить все поля')
    .max(256, 'Адрес электронной почты не должен содержать больше 256 символов')
    .email('Недействительный адрес электронной почты'),
  password: z
    .string()
    .max(24, 'Пароль не должен содержать больше 24 символов')
    .min(6, 'Пароль должен включать минимум 6 символов')
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)/.test(value), {
      message:
        'Пароль должен включать хотя бы одну букву латинского алфавита, хотя бы одну цифру',
    })
    .refine((value) => /^[A-Za-z\d._*!]{6,}$/.test(value), {
      message: 'Допустимые символы: A-Z, a-z, 0-9, . _ * !',
    }),
})

export type AuthorizationFormSchema = z.infer<typeof authorizationFormSchema>
