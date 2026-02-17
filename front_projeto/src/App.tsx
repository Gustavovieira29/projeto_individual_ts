import { useEffect, useState } from 'react'
import { api } from './services/api' // Importa a conexão que criamos
import './App.css'

function App() {
  // Estado para guardar a mensagem que vem do NestJS
  const [mensagem, setMensagem] = useState('Carregando conexão...')

  useEffect(() => {
    // Chamada para o Back-end assim que a tela abre
    api.get('/')
      .then((response) => {
        // response.data contém o que o NestJS enviou
        setMensagem(response.data)
      })
      .catch((error) => {
        console.error("Erro na conexão:", error)
        setMensagem('Erro ao conectar com o Back-end')
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Em execução</h1>
        <div className="card">
          <h2>Status do Servidor:</h2>
          {/* Exibe a mensagem que veio do NestJS */}
          <p style={{ color: '#646cff', fontSize: '1.5rem' }}>
            {mensagem}
          </p>
        </div>
        <p>
          React (Porta 5173) + NestJS (Porta 3000)
        </p>
      </header>
    </div>
  )
}

export default App