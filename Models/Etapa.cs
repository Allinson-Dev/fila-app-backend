namespace FilaApp.Api.Models;
public class Etapa
{
    public int Id { get; set; }
    public int ServicoId { get; set; }
    public string Nome { get; set; } = "";
    public int DuracaoMinutos { get; set; }
    public int Ordem { get; set; }
    public Servico? Servico { get; set; }
}