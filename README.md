# 🎉 Convite — Plataforma de Convites Interativos

Um projeto em React inspirado na experiência do Festalab: convite fixo à esquerda, conteúdo navegável à direita e seções que funcionam como páginas independentes. Inclui formulário de RSVP, navegação por ícones e área administrativa para edição do conteúdo.

---

## 🚀 Tecnologias Utilizadas

- **React + Vite**
- **TypeScript**
- **Lucide-React** (ícones)
- **CSS Modules / Styled Components**
- **React Hooks**
- **(Opcional)** Integração com **Electron** para versão desktop

---

## 📂 Estrutura do Projeto

/src
/components
InvitePage.jsx
RSVPForm.jsx
SidebarMenu.jsx
/assets
convite.jpeg
/styles
invite.css
App.jsx
main.jsx
public/
README.md


---

## ✨ Funcionalidades

### 🖼️ Layout
- Convite grande fixo à esquerda.
- Lado direito com:
  - Título do evento
  - Data + botão “Adicionar ao calendário”
  - Local do evento
  - Botões de confirmação (RSVP)
  - Conteúdo dividido em seções

### 🔗 Navegação
- Menu vertical de ícones que leva a:
  - **Local**
  - **Mensagem**
  - **Recados**
  - **Confirmação**
- Cada seção se comporta como uma “nova página”.

### 📨 RSVP
- Modal para confirmação de presença.
- Envio de resposta com validação.

### 🔐 Área Administrativa (opcional)
- Edita:
  - Título
  - Data
  - Local
  - Mensagens
  - Configurações gerais

---

## ▶️ Como rodar o projeto

### 1. Instale as dependências
npm install

### 2. Ambiente de desenvolvimento
npm run dev

### 3. Build de produção
npm run build

### 4. Pré-visualizar build
npm run preview

💡 Como funciona o InvitePage

Organiza cada seção com useRef.

Faz scroll automático até a seção desejada.

Mantém estado da aba ativa (local, mensagem, recados, confirmação).

Controla modal e dados do RSVP.

📌 Roadmap

 Versão mobile otimizada

 Animações suaves entre seções

 Integração com backend real para RSVP

 Painel administrativo completo
