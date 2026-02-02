#!/bin/bash
# Script para testar o projeto localmente antes de fazer deploy

echo "🔧 Testando Frontend..."
cd frontend
npm install --legacy-peer-deps
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend buildado com sucesso!"
else
    echo "❌ Erro ao fazer build do frontend"
    exit 1
fi

echo ""
echo "🔧 Testando Backend..."
cd ../backend
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependências do backend instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências do backend"
    exit 1
fi

echo ""
echo "✅ Projeto pronto para deploy!"
echo ""
echo "Próximos passos:"
echo "1. Crie um repositório em GitHub: seu-usuario.github.io"
echo "2. Faça push do código:"
echo "   git add ."
echo "   git commit -m 'Deploy portfolio'"
echo "   git push -u origin main"
echo "3. Suba o backend no Render.com"
echo "4. Atualize o .env.production com a URL do backend"
