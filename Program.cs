using FilaApp.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5000");

var cs = builder.Configuration.GetConnectionString("Default")!;
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseMySql(cs, ServerVersion.AutoDetect(cs)));

builder.Services.AddControllers();
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();
app.UseCors();
app.MapControllers();
app.Run();