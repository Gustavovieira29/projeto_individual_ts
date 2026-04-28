# projeto_individual_ts
Meu projeto individual, feito em TypeScript e React.

## Documento de Estratégia de Testes

### 1. Funcionalidades principais

1. Cadastro de Usuário
2. Painel Administrador
3. Validação de Usuário

### 2. Regras de negócio por funcionalidade

#### 2.1 Cadastro de Usuário
- O usuário deve preencher nome, e-mail e senha para criar conta.
- O e-mail deve ser único e seguir formato válido.
- A senha deve ter no mínimo 6 caracteres.
- Após cadastro bem-sucedido, o usuário deve ser direcionado para a tela de login ou painel.

#### 2.2 Painel Administrador
- O administrador deve visualizar dados do sistema e usuários cadastrados.
- O painel deve estar acessível apenas após login com credenciais de administrador.
- A navegação no painel deve permitir acessar seções como usuários e relatórios.

#### 2.3 Validação de Usuário
- O sistema deve validar se o e-mail e senha informados existem no cadastro.
- O login deve ser rejeitado quando usuário ou senha estiverem incorretos.
- Mensagens de erro claras devem ser exibidas para dados inválidos.

### 3. Casos de teste

#### Funcionalidade 1: Cadastro de Usuário
- Caso 1: Cadastro com e-mail válido e senha com 6+ caracteres.
  - Tipo: E2E
  - Resultado esperado: o usuário é criado e é redirecionado para a tela de login ou painel.
- Caso 2: Cadastro com e-mail inválido e senha curta.
  - Tipo: Integração
  - Resultado esperado: o cadastro é bloqueado e são exibidas mensagens de erro de validação.

#### Funcionalidade 2: Painel Administrador
- Caso 3: Acesso ao painel com credenciais de administrador válidas.
  - Tipo: Integração
  - Resultado esperado: o painel é exibido com as seções de usuário e relatórios.
- Caso 4: Tentativa de acesso ao painel sem autenticação ou com usuário não administrador.
  - Tipo: E2E
  - Resultado esperado: o acesso é negado e o usuário é redirecionado para login ou recebe mensagem de permissão.

#### Funcionalidade 3: Validação de Usuário
- Caso 5: Login com e-mail e senha corretos.
  - Tipo: Unitário
  - Resultado esperado: a função de validação retorna sucesso e permite acesso.
- Caso 6: Login com senha incorreta para um e-mail cadastrado.
  - Tipo: Unitário
  - Resultado esperado: a função de validação retorna erro e exibe mensagem de usuário ou senha inválida.
