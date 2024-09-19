import { Suspense } from 'react'
import { AppRouter } from './providers/router'
import { MainLayout } from '@/shared/layout/MainLayout'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar'

function App() {
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
