# Guia Completo de Deploy - Portfolio Tiago

## 🚨 Problema: Tela Branca no GitHub Pages

A tela branca geralmente ocorre por:
1. **Caminho base incorreto** - GitHub Pages usa `/seu-repo/` como base
2. **API não acessível** - O backend precisa estar em outro serviço
3. **Falta de routing** - Rotas precisam ser tratadas corretamente

---

## 📋 Solução em 3 Passos

### **PASSO 1: Preparar o Repositório GitHub**

1. Faça login no GitHub
2. Crie um **novo repositório** público com o nome: `seu-usuario.github.io`
   - Exemplo: `tiago.github.io`
3. **NÃO** clone, vamos fazer diferente

---

### **PASSO 2: Configurar Frontend para Deploy**

#### 2.1 Atualizar package.json

Abra `frontend/package.json` e adicione:
```json
"homepage": "https://seu-usuario.github.io",
"scripts": {
  "build": "react-scripts build",
  "deploy": "npm run build && gh-pages -d build"
}
```

#### 2.2 Instalar gh-pages

```bash
cd frontend
npm install --save-dev gh-pages
```

#### 2.3 Criar arquivo `.env.production`

Já foi criado em: `frontend/.env.production`

```
REACT_APP_API_URL=https://seu-backend-url.com
```

---

### **PASSO 3: Deploy do Backend**

O backend precisa estar em um serviço cloud. Recomendações:

#### **Opção A: Render (RECOMENDADO - Gratuito)**
1. Vá para https://render.com
2. Crie uma conta
3. Clique em "New +" > "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Name:** portfolio-api
   - **Environment:** Python 3
   - **Build Command:** `pip install -r backend/requirements.txt`
   - **Start Command:** `cd backend && uvicorn server:app --host 0.0.0.0`
   - **Root Directory:** (deixe vazio)

#### **Opção B: Railway**
1. Vá para https://railway.app
2. Crie uma conta com GitHub
3. Crie novo projeto
4. Deploy do repositório

#### **Opção C: Vercel + Python**
1. Vá para https://vercel.com
2. Importe repositório
3. Defina Build Command: `pip install -r backend/requirements.txt`

---

### **PASSO 4: Atualizar código para usar a API**

#### 4.1 Criar arquivo `frontend/src/config.js`

```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

#### 4.2 Atualizar chamadas de API

Em `frontend/src/services/api.js`:

```javascript
import axios from 'axios';
import { API_URL } from '@/config';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
```

---

### **PASSO 5: Fazer o Deploy**

#### **Opção 1: Via GitHub Actions (Automático)**

1. Os arquivos já foram criados em `.github/workflows/deploy.yml`
2. Faça push do código:

```bash
git add .
git commit -m "Setup deploy"
git push origin main
```

3. Vá para GitHub > seu repo > Actions
4. Confirme que o workflow rodou

#### **Opção 2: Manual (Local)**

```bash
cd frontend
npm install
npm run build
npm run deploy
```

---

## ⚙️ Configurar Variáveis de Ambiente no GitHub

1. Vá para seu repositório GitHub
2. Settings > Secrets and variables > Actions
3. Clique em "New repository secret"
4. Adicione:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://seu-backend-url.render.com`

---

## 🔗 Configurar CORS no Backend

Abra `backend/server.py` e atualize CORS:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://seu-usuario.github.io",  # SEU SITE GITHUB PAGES
        "https://seu-backend-url.render.com",  # SEU BACKEND
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ✅ Checklist Final

- [ ] Repositório criado: `seu-usuario.github.io`
- [ ] `npm run build` funciona sem erros
- [ ] Backend está rodando em um serviço (Render, Railway, etc)
- [ ] `.env.production` configurado com URL do backend
- [ ] CORS do backend atualizado
- [ ] GitHub Actions workflow criado
- [ ] Secrets configurados no GitHub
- [ ] Push feito para main branch

---

## 🧪 Testar Localmente

```bash
# Terminal 1 - Backend
cd backend
python -m pip install -r requirements.txt
python -m uvicorn server:app --reload

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

Acesse: http://localhost:3000

---

## 🆘 Troubleshooting

### "Tela branca mas sem erros"
- Abra DevTools (F12) > Console
- Procure por erros de CORS ou 404
- Verifique se `REACT_APP_API_URL` está correto

### "Chamadas para API falham"
- Verifique CORS no backend
- Confirme que backend está rodando
- Teste chamada com Postman: `https://seu-backend/api/seu-endpoint`

### "Build falha no GitHub Actions"
- Verifique `npm run build` localmente
- Confira se dependencies estão no `package.json`
- Veja logs em GitHub > Actions > seu workflow

---

## 📞 Precisa de ajuda?

1. Compartilhe o erro do Console (F12)
2. Compartilhe a URL da API
3. Compartilhe o URL do seu site
