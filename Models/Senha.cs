namespace FilaApp.Api.Models;
public class Senha
{
    public int Id { get; set; }
    public string Numero { get; set; } = "";
    public int FilaId { get; set; }
    public int ServicoId { get; set; }
    public int? ClienteId { get; set; }
    public int? EtapaAtualId { get; set; }
    public string Status { get; set; } = "aguardando";
    public int TempoEstimadoMin { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ChamadaEm { get; set; }
    public DateTime? FinalizadaEm { get; set; }

    public Fila? Fila { get; set; }
    public Servico? Servico { get; set; }
    public Cliente? Cliente { get; set; }
    public Etapa? EtapaAtual { get; set; }
}