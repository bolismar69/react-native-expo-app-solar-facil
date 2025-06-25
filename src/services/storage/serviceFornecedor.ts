import { adicionarItem, carregarLista } from "@/services/storage/storageUtils";
import { FornecedorType } from "@/types/FornecedorType";

const FILENAME = "fornecedores.json";

// Salva um único fornecedor no arquivo JSON
// Se o arquivo não existir, ele será criado
export async function salvarFornecedor(data: FornecedorType) {
  await adicionarItem(FILENAME, data);
}

// Retorna uma lista de fornecedores
export async function listarFornecedores(): Promise<FornecedorType[]> {
  return await carregarLista<FornecedorType>(FILENAME);
}

// atualize um fornecedor existente
export async function atualizarFornecedor(data: FornecedorType) {
  const fornecedores = await listarFornecedores();
  const index = fornecedores.findIndex(f => f.cnpj === data.cnpj);
  
  if (index !== -1) {
    fornecedores[index] = data;
    localStorage.setItem(FILENAME, JSON.stringify(fornecedores));
  } else {
    throw new Error("Fornecedor não encontrado");
  }
}

// Exclui um fornecedor pelo CNPJ
export async function excluirFornecedor(cnpj: string) {
  const fornecedores = await listarFornecedores();
  const index = fornecedores.findIndex(f => f.cnpj === cnpj);
  
  if (index !== -1) {
    fornecedores.splice(index, 1);
    localStorage.setItem(FILENAME, JSON.stringify(fornecedores));
  } else {
    throw new Error("Fornecedor não encontrado");
  }
}
