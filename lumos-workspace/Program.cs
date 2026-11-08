using lumos_workspace.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao container
builder.Services.AddControllers();

// Configura o DbContext com SQLite
builder.Services.AddDbContext<WorkspaceContext>(options =>
    options.UseSqlite("Data Source=workspace.db"));

// Adiciona Swagger (se quiser testar via navegador)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configura o pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
