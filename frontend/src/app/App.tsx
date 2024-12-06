import { Suspense, useEffect } from 'react'
import { AppRouter } from './providers/router'
import { MainLayout } from '@/shared/layout/MainLayout'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar'
import { AuthPage } from '@/pages/AuthPage'
import { USER_SECRET_TOKEN } from '@/shared/const/localstorage'
import { useAppDispatch } from '@/shared/lib/hooks/useContext'
import { useSelector } from 'react-redux'
import { getInitedState } from '@/entities/User/models/selectors/getInitiateState'
import { initAuthData } from '@/entities/User/models/services/initAuthData'

function App() {
  const dispatch = useAppDispatch()
  const inited = useSelector(getInitedState)

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData())
    }
  })
  const token = localStorage.getItem(USER_SECRET_TOKEN)
  // if (!token) {
  //   return <AuthPage />
  // }

  return (
    <div className="app">
      <Suspense fallback="Loading...">
        <MainLayout header={<Header />} sidebar={<Sidebar />}>
          <AppRouter />
        </MainLayout>
      </Suspense>
    </div>
  )
}

export default App
