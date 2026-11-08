$rootPath = $PSScriptRoot

Write-Host "=== A INICIAR O SISTEMA FILAFLOW ===" -ForegroundColor Cyan

# 1. Iniciar o MySQL Server numa janela dedicada
Write-Host "[1/3] A iniciar o MySQL Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& 'C:\Program Files\MySQL\MySQL Server 26.7\bin\mysqld.exe' --console"

# Aguardar 3 segundos para o MySQL inicializar
Start-Sleep -Seconds 3

# 2. Iniciar o Back-end (.NET)
Write-Host "[2/3] A iniciar o Back-end .NET..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\fila-app-backend'; dotnet run"

# 3. Iniciar o Front-end (React) na subpasta correta
Write-Host "[3/3] A iniciar o Front-end React..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\fila-app-backend\frontend'; npm run dev"

Write-Host "=== TUDO A POSTO PARA A APRESENTAÇÃO! ===" -ForegroundColor Green
