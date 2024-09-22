import { createContext } from 'react'
const user = {
  name: 'Ярлыкова Юлия',
  birthday: '25-06-2004',
  img: '',
  city: 'Томск',
  aducation: 'ТУСУР',
}

export const AuthContext = createContext<typeof user | null>(null)
