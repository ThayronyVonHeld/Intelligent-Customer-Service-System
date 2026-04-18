# 🏥 Dra. Maggessy Fisioterapia

<p align="center">
  <img src="https://img.shields.io/badge/Status-In%20Progress-yellow" />
  <img src="https://img.shields.io/badge/Focus-Full%20Stack-blue" />
  
  <a href="https://github.com/ThayronyVonHeld/Clinica-Clara-Fisioterapeuta/blob/main/README.md">
    <img src="https://img.shields.io/badge/Languages-EN%20%7C%20PT--BR-green">
  </a>
  
</p>

---

Sistema web completo para gerenciamento de consultas em uma clínica de fisioterapia.

O projeto permite cadastro de usuários, login com autenticação JWT, agendamento de consultas e painel administrativo para secretária.

# 🚀 Deploy

- 🌐 Frontend: https://clinica-clara-fisioterapeuta.vercel.app/
- ⚙️ Backend: https://clinica-clara-fisioterapeuta.onrender.com

---

# 🧠 Funcionalidades

## 👤 Usuário
- Cadastro de conta
- Login com autenticação JWT
- Agendamento de consultas
- Visualização de consultas
- Cancelamento de consultas

## 🧑‍💼 Secretário
- Visualizar todas as consultas
- Visualizar dados dos pacientes

---

# 🛠️ Tecnologias Utilizadas

## Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- Bcrypt

## Frontend
- Vue.js 3
- Axios
- Vue Toastification
- CSS moderno com design responsivo

## Deploy
- Vercel (Frontend)
- Render (Backend)

---

# 🔐 Autenticação

O sistema utiliza autenticação baseada em JWT:

- Token gerado no login
- Armazenado no frontend
- Enviado no header:


Authorization: Bearer TOKEN



- Middleware protege rotas privadas

---

# 📦 Estrutura do Projeto

```

📁 backend
├── config
├── models
├── routes
├── middlewares
├── services
└── server.js

📁 frontend
├── components
├── views
├── services
└── main.js

````

---

# ⚙️ Como rodar localmente

## 🔧 Backend

```bash
cd backend
npm install
npm run dev
````

## 🔧 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🌎 Variáveis de Ambiente

Crie um arquivo `.env` no backend:

```env
PORT=3000
MONGO_URI=seu_mongo_uri
JWT_SECRET=seu_segredo
```

---

# 🔌 Integrações

* API de Clima (OpenWeather)
* API de CEP 

---

# 📌 Melhorias Futuras

* Sistema de notificações
* Dashboard com gráficos
* Responsividade mobile aprimorada
* Upgrade no Desing

---

# 👨‍💻 Autor

**Thayrony Von Held**

* Estudante de Análise e Desenvolvimento de Sistemas
* Desenvolvedor Full Stack em formação

---

# 📢 Observações

Este projeto foi desenvolvido com foco em aprendizado prático, simulando um sistema real de clínica.

---

