import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { api } from './services/api' 
import Login from './pages/Login' // Certifique-se de que o arquivo Login.tsx existe em src/pages
import './App.css'

function App() {
  // Estado para guardar a mensagem que vem do NestJS
  const [mensagem, setMensagem] = useState('Carregando conexão...')

  useEffect(() => {
    // Chamada para o Back-end assim que a tela abre
    api.get('/')
      .then((response) => {
        // response.data contém o que o NestJS enviou (ex: "Hello World!")
        setMensagem(response.data)
      })
      .catch((error) => {
        console.error("Erro na conexão:", error)
        setMensagem('Erro ao conectar com o Back-end')
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {/* Menu de navegação simples para você testar */}
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          <Link shadow-sm to="/" style={{ margin: '10px' }}>Home</Link>
          <Link to="/login" style={{ margin: '10px' }}>Ir para Login</Link>
        </nav>

        <Routes>
          {/* ROTA DA PÁGINA INICIAL (O que você já tinha) */}
          <Route path="/" element={
            <header className="App-header">
              <h1>Em execução</h1>
              <div className="card">
                <h2>Status do Servidor NestJS:</h2>
                <p style={{ color: '#646cff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {mensagem}
                </p>
              </div>
              <p>React (Porta 5173) + NestJS (Porta 3000)</p>
            </header>
          } />

          {/* NOVA ROTA DE LOGIN */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App