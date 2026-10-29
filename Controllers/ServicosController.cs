using FilaApp.Api.Data;
using FilaApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilaApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicosController : ControllerBase
{
    private readonly AppDbContext _db;
    public ServicosController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Servicos
            .Include(s => s.Etapas.OrderBy(e => e.Ordem))
            .OrderBy(s => s.Nome).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ServicoDto dto)
    {
        var s = new Servico { Nome = dto.Nome, Descricao = dto.Descricao };
        _db.Servicos.Add(s);
        await _db.SaveChangesAsync();
        return Ok(new { id = s.Id });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var s = await _db.Servicos.FindAsync(id);
        if (s is null) return NotFound();
        _db.Servicos.Remove(s);
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }

    [HttpPost("{id}/etapas")]
    public async Task<IActionResult> AddEtapa(int id, [FromBody] EtapaDto dto)
    {
        if (!await _db.Servicos.AnyAsync(s => s.Id == id)) return NotFound();
        var e = new Etapa { ServicoId = id, Nome = dto.Nome,
                            DuracaoMinutos = dto.DuracaoMinutos, Ordem = dto.Ordem };
        _db.Etapas.Add(e);
        await _db.SaveChangesAsync();
        return Ok(new { id = e.Id });
    }
}