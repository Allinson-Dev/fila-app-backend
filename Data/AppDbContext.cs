using FilaApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FilaApp.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt) { }

    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Servico> Servicos => Set<Servico>();
    public DbSet<Etapa> Etapas => Set<Etapa>();
    public DbSet<Fila> Filas => Set<Fila>();
    public DbSet<Senha> Senhas => Set<Senha>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<Cliente>().HasIndex(c => c.Cpf).IsUnique();
        mb.Entity<Etapa>().HasOne(e => e.Servico)
            .WithMany(s => s.Etapas)
            .HasForeignKey(e => e.ServicoId)
            .OnDelete(DeleteBehavior.Cascade);
        mb.Entity<Senha>().HasOne(s => s.Fila).WithMany()
            .HasForeignKey(s => s.FilaId).OnDelete(DeleteBehavior.Restrict);
        mb.Entity<Senha>().HasOne(s => s.Cliente).WithMany()
            .HasForeignKey(s => s.ClienteId).OnDelete(DeleteBehavior.SetNull);
    }
}