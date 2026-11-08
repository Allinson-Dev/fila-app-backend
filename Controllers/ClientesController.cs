using FilaApp.Api.Data;
using FilaApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilaApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ClientesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? q)
    {
        var query = _db.Clientes.AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(c => c.Nome.Contains(q) || c.Cpf.Contains(q) ||
                                    (c.Telefone != null && c.Telefone.Contains(q)));
        return Ok(await query.OrderBy(c => c.Nome).ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ClienteDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nome) || string.IsNullOrWhiteSpace(dto.Cpf))
            return BadRequest(new { error = "Nome e CPF obrigatórios" });
        if (await _db.Clientes.AnyAsync(c => c.Cpf == dto.Cpf))
            return BadRequest(new { error = "CPF já cadastrado" });

        var c = new Cliente { Nome = dto.Nome, Cpf = dto.Cpf,
                              Endereco = dto.Endereco, Telefone = dto.Telefone };
        _db.Clientes.Add(c);
        await _db.SaveChangesAsync();
        return Ok(new { id = c.Id });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ClienteDto dto)
    {
        var c = await _db.Clientes.FindAsync(id);
        if (c is null) return NotFound();
        if (await _db.Clientes.AnyAsync(x => x.Cpf == dto.Cpf && x.Id != id))
            return BadRequest(new { error = "CPF já cadastrado" });

        c.Nome = dto.Nome; c.Cpf = dto.Cpf;
        c.Endereco = dto.Endereco; c.Telefone = dto.Telefone;
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var c = await _db.Clientes.FindAsync(id);
        if (c is null) return NotFound();
        _db.Clientes.Remove(c);
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }
}