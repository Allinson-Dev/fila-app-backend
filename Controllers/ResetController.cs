using FilaApp.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilaApp.Api.Controllers;

[ApiController]
[Route("api/reset")]
public class ResetController : ControllerBase
{
    private readonly AppDbContext _db;
    public ResetController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Reset()
    {
        await _db.Senhas.ExecuteDeleteAsync();
        await _db.Filas.ExecuteUpdateAsync(f => f.SetProperty(x => x.Contador, 0));
        return Ok(new { ok = true });
    }
}