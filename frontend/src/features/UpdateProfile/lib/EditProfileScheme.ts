import { z } from 'zod'

const regex = /^[А-яA-z-. ]+$/

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'Заполните обязательные поля')
    .regex(regex, 'Поле содержит недопустимые символы')
    .max(256, 'Допустимое количество символов 1-256'),
  date: z
    .string()
    .min(1, 'Заполните обязательные поля')
    .length(10, 'Допустимо использовать символы 0-9. Допустимый вид XX.XX.XXXX')
    .transform((value) => {
      const [day, month, year] = value.split('.')
      return `${year}-${month}-${day}`
    })
    .refine((date) => {
      const currentDate = new Date().getFullYear()
      return Number(date.split('-')[0]) <= currentDate + 1
    }, 'Неверный формат даты'),
  email: z
    .string()
    .min(1, 'Заполните обязательные поля')
    .regex(regex, 'Поле содержит недопустимые символы'),
  city: z
    .string()
    .min(1, 'Заполните обязательные поля')
    .regex(regex, 'Поле содержит недопустимые символы'),
})

export type FormInputData = z.input<typeof editProfileSchema>
export type FormOutputData = z.output<typeof editProfileSchema>
