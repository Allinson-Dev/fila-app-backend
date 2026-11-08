using FilaApp.Api.Data;
using FilaApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilaApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SenhasController : ControllerBase
{
    private readonly AppDbContext _db;
    public SenhasController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var senhas = await _db.Senhas
            .Include(s => s.Cliente)
            .Include(s => s.Servico)
            .Include(s => s.Fila)
            .Include(s => s.EtapaAtual)
            .Where(s => s.Status != "finalizada")
            .OrderByDescending(s => s.Fila!.Tipo == "prioritaria")
            .ThenBy(s => s.CreatedAt)
            .ToListAsync();

        var etapas = await _db.Etapas.ToListAsync();

        var result = senhas.Select(s => new
        {
            id             = s.Id,
            numero         = s.Numero,
            filaId         = s.FilaId,
            filaNome       = s.Fila?.Nome,
            filaTipo       = s.Fila?.Tipo,
            servicoId      = s.ServicoId,
            servicoNome    = s.Servico?.Nome,
            clienteId      = s.ClienteId,
            clienteNome    = s.Cliente?.Nome,
            etapaAtualId   = s.EtapaAtualId,
            etapaNome      = s.EtapaAtual?.Nome,
            status         = s.Status,
            chamadaEm      = s.ChamadaEm,
            tempoRestante  = etapas
                .Where(e => e.ServicoId == s.ServicoId &&
                            (s.EtapaAtual == null || e.Ordem >= s.EtapaAtual.Ordem))
                .Sum(e => e.DuracaoMinutos)
        });

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SenhaDto dto)
    {
        var fila = await _db.Filas.FindAsync(dto.FilaId);
        if (fila is null) return BadRequest(new { error = "Fila não encontrada" });

        fila.Contador++;
        var numero = $"{fila.Prefixo}{fila.Contador:D3}";

        var etapas = await _db.Etapas
            .Where(e => e.ServicoId == dto.ServicoId)
            .OrderBy(e => e.Ordem).ToListAsync();

        var senha = new Senha {
            Numero           = numero,
            FilaId           = dto.FilaId,
            ServicoId        = dto.ServicoId,
            ClienteId        = dto.ClienteId,
            EtapaAtualId     = etapas.FirstOrDefault()?.Id,
            TempoEstimadoMin = etapas.Sum(e => e.DuracaoMinutos),
            Status           = "aguardando"
        };
        _db.Senhas.Add(senha);
        await _db.SaveChangesAsync();
        return Ok(new { id = senha.Id, numero });
    }

    [HttpPost("{id}/chamar")]
    public async Task<IActionResult> Chamar(int id)
    {
        var s = await _db.Senhas.FindAsync(id);
        if (s is null) return NotFound();
        s.Status = "chamada";
        s.ChamadaEm = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }

    [HttpPost("{id}/avancar")]
    public async Task<IActionResult> Avancar(int id)
    {
        var s = await _db.Senhas.Include(x => x.EtapaAtual)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (s is null) return NotFound();

        var ordemAtual = s.EtapaAtual?.Ordem ?? 0;
        var proxima = await _db.Etapas
            .Where(e => e.ServicoId == s.ServicoId && e.Ordem > ordemAtual)
            .OrderBy(e => e.Ordem).FirstOrDefaultAsync();

        if (proxima is not null)
        {
            s.EtapaAtualId = proxima.Id;
            s.Status = "em_atendimento";
            s.ChamadaEm = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return Ok(new { ok = true, finalizada = false });
        }

        s.Status = "finalizada";
        s.FinalizadaEm = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new { ok = true, finalizada = true });
    }

    [HttpPost("{id}/finalizar")]
    public async Task<IActionResult> Finalizar(int id)
    {
        var s = await _db.Senhas.FindAsync(id);
        if (s is null) return NotFound();
        s.Status = "finalizada";
        s.FinalizadaEm = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }

    [HttpGet("chamada-atual")]
    public async Task<IActionResult> ChamadaAtual()
    {
        var s = await _db.Senhas
            .Include(x => x.Cliente).Include(x => x.Servico)
            .Include(x => x.Fila).Include(x => x.EtapaAtual)
            .Where(x => (x.Status == "chamada" || x.Status == "em_atendimento")
                        && x.ChamadaEm != null)
            .OrderByDescending(x => x.ChamadaEm)
            .FirstOrDefaultAsync();

        if (s is null) return Ok(null);

        return Ok(new {
            id          = s.Id,
            numero      = s.Numero,
            clienteNome = s.Cliente?.Nome,
            servicoNome = s.Servico?.Nome,
            filaNome    = s.Fila?.Nome,
            etapaNome   = s.EtapaAtual?.Nome,
            chamadaEm   = s.ChamadaEm,
            status      = s.Status
        });
    }
}