using FilaApp.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace FilaApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EtapasController : ControllerBase
{
    private readonly AppDbContext _db;
    public EtapasController(AppDbContext db) => _db = db;

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var e = await _db.Etapas.FindAsync(id);
        if (e is null) return NotFound();
        _db.Etapas.Remove(e);
        await _db.SaveChangesAsync();
        return Ok(new { ok = true });
    }
}