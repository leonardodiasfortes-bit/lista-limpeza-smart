import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import PhoneFrame from './components/PhoneFrame'
import Layout from './components/Layout'
import QuemSomos from './pages/QuemSomos'
import Persona from './pages/Persona'
import FontesReceita from './pages/FontesReceita'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import LerNota from './pages/LerNota'
import ListaMercados from './pages/ListaMercados'
import Historico from './pages/Historico'

function Pages({ activeTab }) {
  switch (activeTab) {
    case 'inicio':
      return <Home />
    case 'ler-nota':
      return <LerNota />
    case 'lista':
      return <ListaMercados />
    case 'historico':
      return <Historico />
    default:
      return <Home />
  }
}

function AppShell() {
  const { state, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('inicio')

  if (state.introStage === 'team') {
    return <QuemSomos onContinue={() => dispatch({ type: 'ADVANCE_INTRO' })} />
  }

  if (state.introStage === 'persona') {
    return <Persona onContinue={() => dispatch({ type: 'ADVANCE_INTRO' })} />
  }

  if (state.introStage === 'revenue') {
    return <FontesReceita onRestart={() => dispatch({ type: 'RESET' })} />
  }

  return (
    <PhoneFrame scrollKey={state.profile ? activeTab : 'onboarding'}>
      {!state.profile ? (
        <Onboarding />
      ) : (
        <Layout
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onEndPresentation={() => dispatch({ type: 'ADVANCE_INTRO' })}
        >
          <Pages activeTab={activeTab} />
        </Layout>
      )}
    </PhoneFrame>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
