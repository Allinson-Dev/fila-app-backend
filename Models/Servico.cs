namespace FilaApp.Api.Models;
public class Servico
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string? Descricao { get; set; }
    public List<Etapa> Etapas { get; set; } = new();
}