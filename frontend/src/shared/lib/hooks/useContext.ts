import { createContext } from 'react'
const user = {
  name: 'Ярлыкова Юлия',
  birthday: '25-06-2004',
  img: '',
  city: 'Томск',
  aducation: 'ТУСУР',
}

interface user {
  login: string
  password: string
}

export const AuthContext = createContext<user | null>(null)
