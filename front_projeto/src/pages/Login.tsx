import { useState } from 'react';
import { api } from '../services/api'; // Sua conexão com o NestJS

const Login = () => {
  // Definimos o estado com tipos explicitos
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [erro, setErro] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue
    
    try {
      // Enviamos os dados para a rota do NestJS que vamos criar
      const response = await api.post('/auth/login', { email, password });
      console.log('Sucesso:', response.data);
      alert('Login realizado com sucesso!');
      // Aqui você guardaria o token e redirecionaria o usuário
    } catch (err) {
      setErro('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Acessar Sistema</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        
        <input 
          type="email" 
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;