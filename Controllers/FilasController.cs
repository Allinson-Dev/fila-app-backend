using FilaApp.Api.Data;
using FilaApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilaApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilasController : ControllerBase
{
    private readonly AppDbContext _db;
    public FilasController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Filas
            .OrderByDescending(f => f.Tipo).ThenBy(f => f.Nome).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] FilaDto dto)
    {
        var f = new Fila {
            Nome = dto.Nome,
            Tipo = dto.Tipo ?? "normal",
            Prefixo = (dto.Prefixo ?? "N").ToUpper()
        };
        _db.Filas.Add(f);
        await _db.SaveChangesAsync();
        return Ok(new { id = f.Id });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var f = await _db.Filas.FindAsync(id);
        if (f is null) return NotFound();
        if (await _db.Senhas.AnyAsync(s => s.FilaId == id))
            return BadRequest(new { error = "Existem senhas vinculadas a esta fila" });
        _db.Filas.Remove(f);
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }
}