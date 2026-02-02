# Environment Variables Guide

## Frontend (.env.production)

```
REACT_APP_API_URL=https://seu-backend-url.com/api
```

Substitua `seu-backend-url.com` pela URL real do seu backend no Render/Railway.

Exemplo:
```
REACT_APP_API_URL=https://portfolio-api-xyz123.onrender.com/api
```

---

## Backend (.env)

```
MONGO_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=portfolio
```

---

## GitHub Secrets

No repositório GitHub, adicione em Settings → Secrets:

### `REACT_APP_API_URL`
Seu backend URL em produção
