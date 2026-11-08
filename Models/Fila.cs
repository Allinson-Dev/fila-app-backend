namespace FilaApp.Api.Models;
public class Fila
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string Tipo { get; set; } = "normal"; // normal | prioritaria
    public string Prefixo { get; set; } = "N";
    public int Contador { get; set; }
}