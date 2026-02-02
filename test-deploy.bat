@echo off
REM Script para testar o projeto localmente antes de fazer deploy (Windows)

echo.
echo 🔧 Testando Frontend...
echo.
cd frontend
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências do frontend
    exit /b 1
)

call npm run build
if errorlevel 1 (
    echo ❌ Erro ao fazer build do frontend
    exit /b 1
)

echo.
echo ✅ Frontend buildado com sucesso!
echo.

echo 🔧 Testando Backend...
cd ..\backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências do backend
    exit /b 1
)

echo.
echo ✅ Dependências do backend instaladas com sucesso!
echo.

echo ✅ Projeto pronto para deploy!
echo.
echo Próximos passos:
echo 1. Crie um repositório em GitHub: seu-usuario.github.io
echo 2. Faça push do código:
echo    git add .
echo    git commit -m "Deploy portfolio"
echo    git push -u origin main
echo 3. Suba o backend no Render.com
echo 4. Atualize o .env.production com a URL do backend
echo.
pause
