# 🚀 PORTFOLIO PRONTO PARA DEPLOY

## ✅ O que foi configurado:

- ✔️ GitHub Pages configurado com basename correto
- ✔️ GitHub Actions workflow para deploy automático
- ✔️ 404.html para routing funcionar corretamente
- ✔️ Variáveis de ambiente configuradas (.env.production)
- ✔️ package.json com gh-pages dependency
- ✔️ CORS pronto no backend
- ✔️ Scripts de teste (test-deploy.bat para Windows)

---

## 🎯 COMECE AQUI - 3 PASSOS RÁPIDOS:

### **PASSO 1: Criar repositório no GitHub** (2 min)

1. Abra https://github.com/new
2. Nome do repo: `seu-usuario.github.io` (substitua seu-usuario pelo seu user)
3. Marque como **Public**
4. Clique em "Create repository"
5. Copie a URL (tipo: `https://github.com/seu-usuario/seu-usuario.github.io.git`)

### **PASSO 2: Fazer push do código** (1 min)

Abra PowerShell na pasta do projeto e execute:

```powershell
git init
git add .
git commit -m "Deploy portfolio"
git branch -M main
git remote add origin [https://github.com/HypeGen/Deploy-portfolio.git]
git push -u origin main
```

### **PASSO 3: Deploy do Backend** (5-10 min)

**Opção A - RENDER (RECOMENDADO):**

1. Vá para https://render.com
2. Sign up com GitHub
3. "New +" → "Web Service"
4. Conecte seu repositório
5. Configure:
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && uvicorn server:app --host 0.0.0.0`
6. Clique em "Create"
7. Aguarde o deploy (verde ✓)
8. Copie a URL (tipo: `https://portfolio-api-xxxx.onrender.com`)

**Opção B - RAILWAY:**

1. https://railway.app
2. Sign up com GitHub
3. "New Project" → Select Repository
4. Selecione seu repo
5. Aguarde o deploy automático

---

## 🔗 PRÓXIMO PASSO: Conectar Frontend + Backend

Depois que tiver a URL do backend, edite:

**Arquivo:** `frontend/.env.production`

```
REACT_APP_API_URL=https://seu-backend-url-aqui.onrender.com/api
```

Depois faça novo commit:

```powershell
git add frontend/.env.production
git commit -m "Update backend URL"
git push
```

---

## 🌐 Resultado Final

Seu site estará em: **https://seu-usuario.github.io**

Exemplo: https://tiago.github.io

---

## 🧪 Testar Localmente (Opcional)

```powershell
# Frontend
cd frontend
npm install --legacy-peer-deps
npm start

# Terminal novo - Backend
cd backend
python -m pip install -r requirements.txt
python -m uvicorn server:app --reload
```

Acesse: http://localhost:3000

---

## 📞 Troubleshooting

### "Tela branca"
→ Abra DevTools (F12) → Console → procure por erro
→ Verifique URL do backend em `.env.production`

### "Chamadas de API falham"
→ Verifique CORS em `backend/server.py`
→ Confirme que backend está rodando

### "Build falha"
→ Execute localmente: `cd frontend && npm run build`
→ Veja o erro e me mande

---

## 📋 Checklist Final

- [ ] Repositório criado: `seu-usuario.github.io`
- [ ] Código feito push para GitHub
- [ ] Backend rodando no Render/Railway
- [ ] `.env.production` atualizado com URL do backend
- [ ] Novo commit feito após atualizar `.env.production`
- [ ] Site acessível em `https://seu-usuario.github.io`

---

## 🎓 Entender o que acontece

```
┌─ GitHub Pages ────────────────────────┐
│  seu-usuario.github.io               │
│  (Frontend React buildado)            │
│  ↓                                     │
│  Faz chamadas HTTP para:             │
│  backend-url.onrender.com/api         │
└──────────────────────────────────────┘
         ↓
┌─ Render / Railway ───────────────────┐
│  backend-url.onrender.com            │
│  (Backend FastAPI rodando)           │
│  Retorna dados JSON                  │
└──────────────────────────────────────┘
```

---

## 💡 Dicas

1. **Primeiro commit**: incluir tudo
2. **CORS**: adicionar URLs corretas em `backend/server.py`
3. **Variáveis**: `.env.production` tem precedência sobre `.env`
4. **GitHub Actions**: vai fazer build automático a cada push
5. **Render**: backend vai hibernar se não receber requisições (wake-up automático)

---

**Pronto? Vamos lá! 🚀**

Qualquer dúvida, abra DevTools (F12) e me mande o erro que aparece!
