export type User = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPasswordValid(password: string): boolean {
  return typeof password === 'string' && password.length >= 6;
}

export function isEmailUnique(email: string, users: User[]): boolean {
  return !users.some((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function validateRegistration(
  candidate: { name: string; email: string; password: string },
  users: User[],
) {
  const errors: string[] = [];

  if (!candidate.name || candidate.name.trim().length === 0) {
    errors.push('Nome é obrigatório.');
  }

  if (!isEmailValid(candidate.email)) {
    errors.push('E-mail inválido.');
  } else if (!isEmailUnique(candidate.email, users)) {
    errors.push('E-mail já cadastrado.');
  }

  if (!isPasswordValid(candidate.password)) {
    errors.push('Senha deve ter no mínimo 6 caracteres.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateLogin(
  email: string,
  password: string,
  users: User[],
) {
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return {
      success: false,
      error: 'Usuário não encontrado.',
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      error: 'Senha inválida.',
    };
  }

  return {
    success: true,
    user,
  };
}

export function canAccessAdminPanel(user: User | null) {
  return user?.role === 'admin';
}
