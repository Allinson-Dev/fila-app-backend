# FilaFlow Studio // Fila OS

Sistema de Gestão de Filas de Atendimento em Tempo Real

O FilaFlow Studio é uma aplicação full-stack desenvolvida para alta performance operacional e gestão de atendimento. O sistema combina uma interface moderna em Glassmorphism, integração com banco de dados MySQL para persistência de dados e controle manual de despacho de senhas pelo operador.

---

## Créditos e Desenvolvimento

* **Front-end & UI/UX Design:** Leonardo Landell (Landell.Studio)
  * Arquitetura de interface em 3 colunas, design glassmorphic escuro (`#0047F7`, `#FA4802`, `#FFE1CF`), gerenciamento de estado local com controle manual de chamadas (Normal vs. Preferencial), rastreamento temporal (`calledAt`/`completedAt`) e módulo de impressão.
* **Back-end & Arquitetura de Dados:** Alisson Pantarotto
  * Desenvolvimento da API RESTful em ASP.NET Core (.NET 10.0), estrutura de controllers (`ClientesController`, `SenhasController`), modelagem relacional de banco de dados e endpoints de integração.

---

## Tecnologias Utilizadas

### Front-end
* React 19 + TypeScript + Vite
* Tailwind CSS (Estilização Glassmorphism e layout responsivo)
* Framer Motion (Animações de entrada, modais e transições)
* Lucide React (Biblioteca de ícones)
* Axios (Cliente HTTP para comunicação com a API REST)

### Back-end
* ASP.NET Core API (.NET 10.0) — porta `5000`
* MySQL (`fila_db`) via Entity Framework Core / Pomelo
* PowerShell Scripting (`iniciar-sistema.ps1` para inicialização automatizada de infraestrutura e serviços)

---

## Principais Funcionalidades

### 1. Dashboard Operacional (Layout em 3 Colunas)
* **Coluna 1 (TV Preview & Monitor):** Exibição em tempo real da senha atual em chamada, retorno do guichê, horário de chamada e fila de espera dinâmica.
* **Coluna 2 (Consulta por CPF / Gestão de Clientes):** Pesquisa ativa por nome ou CPF integrada ao MySQL, cadastro rápido de novos clientes e emissão de senhas vinculadas ou avulsas.
* **Coluna 3 (Operator Commands):** Botões independentes para despacho manual (`Chamar Próxima Preferencial` e `Chamar Próxima Normal`), permitindo ao operador controlar diretamente a proporção de atendimento (por exemplo, 2 preferenciais para 1 normal), além de controles de transmissão e reset diário.

### 2. Rastreamento Temporal e Relatórios
* Marcação automática e registro do horário de emissão, chamada (`calledAt`) e conclusão (`completedAt`) de cada atendimento.
* Modal de relatório com visualização em tabela e suporte à impressão direta via navegador (`window.print()`).

### 3. Inicialização Automatizada
* Script PowerShell dedicado para subir o banco MySQL, a API .NET 10.0 e o servidor Vite em paralelo através de um único comando.

---

## Estrutura do Projeto

```text
fila-app-backend/
├── frontend/                     # Aplicação React + Tailwind + Vite
│   ├── src/
│   │   ├── components/           # Componentes modulares
│   │   ├── types/                # Interfaces TypeScript (Ticket, Customer, Queue)
│   │   ├── App.tsx               # Dashboard principal
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── Controllers/                  # Controllers ASP.NET Core (.NET 10.0)
├── Data/                         # DbContext e Migrations do EF Core
├── Models/                       # Entidades C# mapeadas para o MySQL
├── Program.cs                    # Middlewares, CORS e pipeline do ASP.NET Core
├── iniciar-sistema.ps1           # Script PowerShell de inicialização
└── README.md                     # Documentação do projeto

## Como Executar o Projeto

### Pré-requisitos
* Node.js (versão 18 ou superior)
* .NET 10.0 SDK
* Servidor MySQL ativo localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/Allinson-Dev/fila-app-backend
cd fila-app-backend

## 2. Execução automática via PowerShell: 
*Na raiz do projeto, execute o script de inicialização.
.\iniciar-sistema.ps1

*Nota: Caso o PowerShell retorne um erro de permissão para execução de scripts, execute previamente:
Set-ExecutionPolicy Unrestricted -Scope Process

*Após a execução do script:

Front-end: http://localhost:5173

Back-end API: http://localhost:5000/api