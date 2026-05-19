import {
  canAccessAdminPanel,
  isEmailValid,
  isPasswordValid,
  validateLogin,
  validateRegistration,
  type User,
} from '../src/auth.service';

describe('AuthService', () => {
  const users: User[] = [
    { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { name: 'User', email: 'user@example.com', password: 'user123', role: 'user' },
  ];

  describe('Cadastro de Usuário', () => {
    it('deve aceitar registro com email válido e senha de 6+ caracteres', () => {
      const result = validateRegistration(
        { name: 'Novo Usuário', email: 'novo@dominio.com', password: 'senha123' },
        users,
      );

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar registro com email inválido e senha curta', () => {
      const result = validateRegistration(
        { name: 'Teste', email: 'email-invalido', password: '123' },
        users,
      );

      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(
        expect.arrayContaining([
          'E-mail inválido.',
          'Senha deve ter no mínimo 6 caracteres.',
        ]),
      );
    });

    it('deve rejeitar registro quando o nome está em branco', () => {
      const result = validateRegistration(
        { name: '', email: 'novo@dominio.com', password: 'senha123' },
        users,
      );

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Nome é obrigatório.');
    });

    it('deve rejeitar registro quando o email já existe', () => {
      const result = validateRegistration(
        { name: 'Outro', email: 'user@example.com', password: 'senha123' },
        users,
      );

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('E-mail já cadastrado.');
    });
  });

  describe('Painel Administrador', () => {
    it('deve permitir acesso ao painel para usuário administrador', () => {
      expect(canAccessAdminPanel(users[0])).toBe(true);
    });

    it('deve negar acesso ao painel para usuário comum', () => {
      expect(canAccessAdminPanel(users[1])).toBe(false);
    });

    it('deve negar acesso quando não há usuário autenticado', () => {
      expect(canAccessAdminPanel(null)).toBe(false);
    });
  });

  describe('Validação de Usuário', () => {
    it('deve permitir login com email e senha corretos', () => {
      const result = validateLogin('user@example.com', 'user123', users);

      expect(result.success).toBe(true);
      expect(result).toHaveProperty('user');
      expect(result.user?.email).toBe('user@example.com');
    });

    it('deve rejeitar login com senha incorreta', () => {
      const result = validateLogin('user@example.com', 'senhaerrada', users);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Senha inválida.');
    });

    it('deve rejeitar login com email não cadastrado', () => {
      const result = validateLogin('naoexistente@example.com', 'senha123', users);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Usuário não encontrado.');
    });
  });

  describe('Regras auxiliares de validação', () => {
    it('deve validar email com formato correto', () => {
      expect(isEmailValid('teste@dominio.com')).toBe(true);
      expect(isEmailValid('teste.com')).toBe(false);
    });

    it('deve validar senha com tamanho mínimo', () => {
      expect(isPasswordValid('123456')).toBe(true);
      expect(isPasswordValid('123')).toBe(false);
    });
  });
});
