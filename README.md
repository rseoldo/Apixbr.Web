# ApixBR Web (Frontend)

Aplicação web do projeto **ApixBR**, desenvolvida em **Angular 18+** com **Standalone Components**, **Signals**, **HttpClient** e integração com API .NET Core.

## 📦 Tecnologias

- Angular 18+ (Standalone Components, Signals)
- RxJS
- SCSS
- TypeScript
- HTML5
- Angular Router
- Visual Studio Code / WebStorm
- Node.js 20+

## 🔧 Pré-requisitos

- Node.js >= 20
- npm >= 9
- Angular CLI >= 18
- Git (opcional)

## ⚡ Setup

```bash
git clone https://dev.azure.com/rseoldo/ApixBR/_git/ApixBR-Frontend
cd apixbr-web
npm install
ng serve --open
```

- API URL: `https://localhost:7228/api/Account`

## 🛠 Estrutura

```
apixbr-web/
├── src/app/modules/auth/       # Login, Registro
├── src/app/modules/dashboard/  # Dashboard
├── src/app/core/               # Auth Store, Guards, Services
└── assets/
```

## 🔒 Autenticação

- JWT com Access + Refresh Token
- Guardas de rota protegem páginas privadas

## 📜 Licença

MIT License