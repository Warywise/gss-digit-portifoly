# Gss Digit Portfolio 🚀

Um portfólio moderno e interativo desenvolvido com **Next.js 15 (App Router)**. O projeto vai além de uma vitrine estática, funcionando como uma mini rede social onde visitantes podem interagir com projetos através de curtidas e comentários, utilizando um sistema de autenticação híbrido e persistência de dados.

> **🌐 Live Demo:** Acesse a versão em produção aqui: **[https://gss-digit.vercel.app](https://gss-digit.vercel.app)** 🌟

-----

## ✨ Funcionalidades

### 🔐 Autenticação & Usuários

  - **✅ Lazy Registration (Backend):** Estrutura de banco de dados e triggers prontas para suportar usuários anônimos e registrados.
  - **✅ Login Híbrido (Frontend):** Interface para login com Google, E-mail ou "Continuar como Anônimo" (Anonymous Sign-ins).
  - **✅ Perfil de Usuário:** Possibilidade de converter conta anônima em permanente sem perder histórico.

### 📱 Experiência do Usuário (UX)

  - **✅ UI Responsiva:** Design fluido com Tailwind CSS e componentes modulares (Cards, Modals).
  - **✅ Dark/Light Mode:** Alternância de tema com persistência local.
  - **✅ Internacionalização (i18n):** Suporte completo para troca entre Português e Inglês no Frontend.

### 💾 Dados & Backend

  - **✅ Supabase Integration:** Cliente configurado com `@supabase/ssr` e Middleware de segurança.
  - **✅ Server-side Caching:** Padrão de "Store" no servidor usando `unstable_cache` para alta performance.
  - **✅ Row Level Security (RLS):** Políticas de segurança blindando o banco de dados contra edições não autorizadas.
  - **✅ Interações em Tempo Real:** Conexão das ações de Like e Comentário com o Front-end.

-----

## 🗺️ Roadmap (Próximos Passos)

1.  [x] Configuração inicial do Next.js e Tailwind.
2.  [x] Modelagem do Banco de Dados (PostgreSQL).
3.  [x] Implementação do Server-side Data Store.
4.  [x] Integração da Home com dados reais do Supabase.
5.  [x] Criação do Modal de Autenticação/Login.
6.  [x] Implementação da lógica de Comentários e Likes no Frontend.
7.  [x] Toggle de Idioma (PT-BR / EN).
8.  [ ] **(Em planejamento)** Criação de um Painel Administrativo para gerenciar projetos.
9.  [ ] **(Em planejamento)** Seletor de Avatares: Permitir que o usuário escolha entre uma lista de avatares predefinidos ou vincule o link de uma imagem externa.

-----

## 🛠️ Arquitetura

Este projeto utiliza o padrão **Server Components** ao máximo para performance e SEO.

  * **State Management (Server-side):**
      * Em vez de Redux ou Context API no cliente, utilizamos o padrão **Server-side Store** com `unstable_cache`.
      * Isso cria uma "Single Source of Truth" no servidor, garantindo dados sempre frescos com revalidação automática via tags (`revalidateTag`) nas Server Actions.

-----

## 🚀 Como Rodar o Projeto

> Caso prefira conferir o resultado atual sem precisar fazer nada, basta acessar: https://gss-digit.vercel.app 🌟

### Pré-requisitos

  * Node.js 22.x (recomendado) ou 20+
  * Conta no [Supabase](https://supabase.com/)
  * Conta no [Resend](https://resend.com/) (para testar disparo de e-mails localmente)

### 1\. Clonar o repositório

```bash
git clone https://github.com/Warywise/gss-digit-portfolio.git
cd gss-digit-portfolio
```

### 2\. Instalar dependências

```bash
npm install
```

### 3\. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto. Por questões de segurança (para evitar uso indevido e consumo de cotas), as chaves reais não são fornecidas no repositório. Para rodar e testar tudo localmente, você precisará preencher com as suas próprias credenciais:

```bash
# Banco de dados e Autenticação
NEXT_PUBLIC_SUPABASE_URL=sua_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui

# Envio de E-mails (Formulário de Contato)
RESEND_API_KEY=sua_resend_api_key_aqui
```

### 4\. Configurar o Banco de Dados (Supabase)

O esquema do banco de dados e as políticas de segurança (RLS) estão documentados no arquivo `src/lib/supabase/schema.sql`.

1.  Acesse o SQL Editor no painel do Supabase.
2.  Copie o conteúdo de `src/lib/supabase/schema.sql`.
3.  Execute o script para criar as tabelas e triggers.
4.  **Importante:** Ative o "Anonymous Sign-ins" em *Authentication \> Providers* no painel do Supabase.

### 5\. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

-----

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar como base para seu próprio portfólio\!

-----

Desenvolvido com código, carinho e ☕ por **Gustavo Sant'Anna**.
