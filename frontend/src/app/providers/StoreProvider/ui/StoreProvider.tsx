import { memo, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateScheme'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: StateSchema
}

export const StoreProvider = memo(
  ({ children, initialState }: StoreProviderProps) => {
    const store = createReduxStore(initialState)

    return <Provider store={store}>{children}</Provider>
  },
)
