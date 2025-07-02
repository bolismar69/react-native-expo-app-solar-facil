export type MovimentacaoMensalType = {
  id: string; // UUID ou identificador único
  associadoId: string; // Referência ao associado beneficiado
  dataReferencia: string; // Mês/Ano no formato YYYY-MM (ex: 2025-07)

  energiaRecebidaKwh: number; // Quantidade de energia recebida no mês (kWh)
  valorEnergiaRecebida: number; // Valor total da energia em R$

  tarifaUnitariaKwh: number; // Tarifa aplicada por kWh

  valorCobrado: number; // Valor cobrado ao beneficiado
  dataVencimento: string; // Data de vencimento (formato ISO)
  dataPagamento?: string; // Data de pagamento (se houver)

  statusPagamento: "pendente" | "pago" | "atrasado"; // Status atual do pagamento

  observacoes?: string; // Observações adicionais, se necessário
  criadoEm: string; // Data de criação do registro
  atualizadoEm?: string; // Última atualização
};
