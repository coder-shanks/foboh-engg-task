import { useState } from 'react'
import Header from './components/Header'
import PageContent from './components/PageContent'
import FreightPage from './pages/Freight'
import CommonPage from './pages/Common'
import MENU_ITEMS from './constants'

function App() {
  const [activeNav, setActiveNav] = useState(MENU_ITEMS[0].name)

  return (
    <>
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />
      <PageContent>
        {activeNav === 'Freight' ? <FreightPage /> : <CommonPage />}
      </PageContent>
    </>
  )
}

export default App
