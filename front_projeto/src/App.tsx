import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { api } from './services/api'
import Login from './pages/Login'
import './App.css'

function App() {
  const [mensagem, setMensagem] = useState('Carregando conexão...')

  useEffect(() => {
    api.get('/')
      .then((response) => {
        setMensagem(response.data)
      })
      .catch((error) => {
        console.error("Erro na conexão:", error)
        setMensagem('Erro ao conectar com o Back-end')
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        
        {/* NAVBAR */}
        <nav className="p-5 border-b border-slate-300 bg-white shadow-sm">
          <Link 
            to="/" 
            className="mr-6 text-slate-700 font-medium hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <Link 
            to="/login" 
            className="text-slate-700 font-medium hover:text-blue-600 transition-colors"
          >
            Ir para Login
          </Link>
        </nav>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <header className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">
                  Em execução
                </h1>

                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h2 className="text-lg font-semibold mb-3">
                    Status do Servidor NestJS:
                  </h2>

                  <p className="text-blue-600 text-2xl font-bold">
                    {mensagem}
                  </p>
                </div>

                <p className="mt-6 text-slate-500">
                  React (Porta 5173) + NestJS (Porta 3000)
                </p>
              </header>
            }
          />

          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
