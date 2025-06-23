export type AssociadoBeneficiadoType = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  estado: string;
  consumoMedio: string;
  planoDesejado: string;
  aceitaTermos: boolean;
  observacoes: string;
};
export type BeneficiadoType = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  estado: string;
  consumoMedio: string;
  planoDesejado: string;
  aceitaTermos: boolean;
  observacoes: string;
};

export type AssociadoFornecedorType = {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  dataFundacao: string;
  endereco: string;
  cidade: string;
  estado: string;
  potenciaInstalada: string;
  disponibilidade: string;
  aceitaTermos: boolean;
  observacoes: string;
};
export type FornecedorType = {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  dataFundacao: string;
  endereco: string;
  cidade: string;
  estado: string;
  potenciaInstalada: string;
  disponibilidade: string;
  aceitaTermos: boolean;
  observacoes: string;
  tipoConexao: string; // Adicionando tipo de conexão
};

export type AssociadoRouteType = {
  key: "beneficiado" | "fornecedor";
  title: string;
};
