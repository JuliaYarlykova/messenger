import { Suspense, useState } from 'react'
import { AppRouter } from './providers/router'
import { MainLayout } from '@/shared/layout/MainLayout'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar'
import { AuthContext } from '@/shared/lib/hooks/useContext'
import { AuthPage } from '@/pages/AuthPage'
import { USER_SECRET_TOKEN } from '@/shared/const/localstorage'

const user = {
  name: 'Ярлыкова Юлия',
  birthday: '25-06-2004',
  img: '',
  city: 'Томск',
  aducation: 'ТУСУР',
}

function App() {
  const [currentUser, setCurrentUser] = useState<typeof user>(user)

  const token = localStorage.getItem(USER_SECRET_TOKEN)

  if (!token) {
    return <AuthPage />
  }

  return (
    <div className="app">
      <AuthContext.Provider value={currentUser}>
        <Suspense fallback="Loading...">
          <MainLayout header={<Header />} sidebar={<Sidebar />}>
            <AppRouter />
          </MainLayout>
        </Suspense>
      </AuthContext.Provider>
    </div>
  )
}

export default App
