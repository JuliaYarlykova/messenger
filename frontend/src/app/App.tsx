import { Suspense } from 'react'
import { AppRouter } from './providers/router'
import { MainLayout } from '@/shared/layout/MainLayout'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar'
import { AuthPage } from '@/pages/AuthPage'
import { USER_SECRET_TOKEN } from '@/shared/const/localstorage'
import { StoreProvider } from './providers/StoreProvider/ui/StoreProvider'

function App() {
  const token = localStorage.getItem(USER_SECRET_TOKEN)

  // if (!token) {
  //   return <AuthPage />
  // }

  return (
    <div className="app">
      <Suspense fallback="Loading...">
        <StoreProvider>
          <MainLayout header={<Header />} sidebar={<Sidebar />}>
            <AppRouter />
          </MainLayout>
        </StoreProvider>
      </Suspense>
    </div>
  )
}

export default App
