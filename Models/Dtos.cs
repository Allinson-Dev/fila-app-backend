namespace FilaApp.Api.Models;

public record ClienteDto(string Nome, string Cpf, string? Endereco, string? Telefone);
public record ServicoDto(string Nome, string? Descricao);
public record EtapaDto(string Nome, int DuracaoMinutos, int Ordem);
public record FilaDto(string Nome, string? Tipo, string? Prefixo);
public record SenhaDto(int FilaId, int ServicoId, int? ClienteId);