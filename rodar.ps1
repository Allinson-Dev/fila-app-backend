    # Script para iniciar o back-end testando automaticamente as versões disponíveis
Write-Host "A verificar ambiente .NET..." -ForegroundColor Cyan

# Tenta rodar usando o .NET 8 se ele estiver disponível na máquina de destino
$dotnet8Path = & "C:\Program Files\dotnet\dotnet.exe" --version 2>$null
if ($dotnet8Path -like "8.*") {
    Write-Host "A iniciar com .NET 8.0..." -ForegroundColor Green
    dotnet run --framework net8.0
} else {
    Write-Host ".NET 8 não detetado diretamente. A iniciar com a versão padrão disponível (.NET 10)..." -ForegroundColor Yellow
    dotnet run --framework net10.0
}