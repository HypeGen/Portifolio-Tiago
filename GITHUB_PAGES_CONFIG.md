# ⚙️ Configurar GitHub Pages

Seu repositório está em `https://github.com/HypeGen/Portifolio-Tiago`

## Passo 1: Abrir configurações do repositório

1. Acesse: https://github.com/HypeGen/Portifolio-Tiago/settings
2. No menu esquerdo, clique em **Pages** (cerca de 1/3 para baixo)

## Passo 2: Configurar source

- **Source:** Selecione "Deploy from a branch"
- **Branch:** Selecione "gh-pages" 
- **Folder:** Selecione "/ (root)"
- Clique em "Save"

## Passo 3: Aguardar deploy

O GitHub Actions vai fazer:
1. Compilar o React (npm build)
2. Enviar para branch `gh-pages`
3. GitHub Pages vai servir automaticamente

## Resultado

Após 2-5 minutos, seu site estará em:
```
https://hypegen.github.io/Portifolio-Tiago/
```

---

## Verificar status do GitHub Actions

1. Vá para: https://github.com/HypeGen/Portifolio-Tiago/actions
2. Veja o workflow "Deploy Frontend"
3. Se tiver ❌, clique para ver o erro
4. Se tiver ✓, o site estará pronto

---

## 🔄 Próximas mudanças

A cada `git push` que você fizer, o GitHub Actions vai:
1. Fazer build do frontend
2. Atualizar o site automaticamente

Sem precisar fazer nada manual!
