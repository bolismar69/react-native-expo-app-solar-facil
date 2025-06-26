// /src/types/AssociadoType.ts
export type AssociadoType = {
  nome: string;
  email: string;
  telefone: string;
  tipoPessoa: "fisica" | "juridica";
  cpf: string;
  cnpj: string;
  // endereco: string;
  // cidade: string;
  // estado: string;
  // cep: string;
  // telefoneAlternativo: string;
  // contato: string;
  // tipoAssociado: "fornecedor" | "beneficiado" | "ambos";
  // documentoIdentidade: string;
  // dataNascimento: string;
  // nomeConcessionaria: string;
  // consumoMedio: string;
  // planoDesejado: string;
  // aceitaTermos: boolean;
  // observacoes: string;
};

export type AssociadoComSenhaStatusType = {
  nome: string;
  email: string;
  telefone: string;
  tipoPessoa: "fisica" | "juridica";
  cpf: string;
  cnpj: string;
  senha: string;
  status: "ativo" | "inativo" | "bloqueado"
};
