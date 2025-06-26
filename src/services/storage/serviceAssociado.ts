import { adicionarItem, carregarLista } from "@/services/storage/storageUtils";
import { AssociadoType } from "@/types/AssociadoType";

const FILENAME = "associados.json";

export async function salvarAssociado(associado: AssociadoType): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Iniciando o processo de salvar associado:", associado);
    try {
      setTimeout(() => {
        // Carregar lista de associados
        const associados = carregarLista<AssociadoType>(FILENAME);
        associados.then((lista) => {
          // Verificar se já existe um associado com o mesmo CPF
          const existente = lista.find(
            (b) =>  (associado.cpf && b.cpf === associado.cpf) || 
                    (associado.cnpj && b.cnpj === associado.cnpj) || 
                    (associado.email && b.email === associado.email) || 
                    (associado.telefone && b.telefone === associado.telefone)
          );
          if (existente) {
            reject(new Error("Associado já existe"));
            return; // Ensure no further execution
          }

          console.log("Adicionando associado:", associado);
          adicionarItem(FILENAME, associado)
            .then(() => {
              console.log("Associado salvo com sucesso:", associado);
              resolve("Associado salvo com sucesso");
            })
            .catch((error) => {
              console.error("Erro ao adicionar associado:", error);
              reject(new Error("Erro ao adicionar associado"));
            });
        }).catch((error) => {
          console.error("Erro ao carregar lista de associados:", error);
          reject(new Error("Erro ao carregar lista de associados"));
        });
      }, 500); // Simulação de delay
    } catch (error) {
      console.error("Erro inesperado:", error);
      reject(new Error("Erro inesperado"));
    }
  });
}
export async function listarAssociados(): Promise<AssociadoType[]> {
  try {
    console.log("Iniciando o processo de listar associados");
    const associados = await carregarLista<AssociadoType>(FILENAME);
    console.log("Lista de associados carregada com sucesso:", associados);
    return associados;
  } catch (error) {
    console.error("Erro ao carregar lista de associados:", error);
    throw new Error("Erro ao carregar lista de associados");
  }
}
export async function atualizarAssociado(associado: AssociadoType): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Iniciando o processo de atualizar associado:", associado);
    try {
      setTimeout(() => {
        // Carregar lista de associados
        const associados = carregarLista<AssociadoType>(FILENAME);
        associados.then((lista) => {
          // Verificar se o associado existe
          const index = lista.findIndex(
            (b) =>  (associado.cpf && b.cpf === associado.cpf) || 
                    (associado.cnpj && b.cnpj === associado.cnpj)
          );
          if (index === -1) {
            reject(new Error("Associado não encontrado"));
            return; // Ensure no further execution
          }

          console.log("Atualizando associado:", associado);
          lista[index] = associado; // Atualiza o associado na lista
          adicionarItem(FILENAME, lista)
            .then(() => {
              console.log("Associado atualizado com sucesso:", associado);
              resolve("Associado atualizado com sucesso");
            })
            .catch((error) => {
              console.error("Erro ao atualizar associado:", error);
              reject(new Error("Erro ao atualizar associado"));
            });
        }).catch((error) => {
          console.error("Erro ao carregar lista de associados:", error);
          reject(new Error("Erro ao carregar lista de associados"));
        });
      }, 500); // Simulação de delay
    } catch (error) {
      console.error("Erro inesperado:", error);
      reject(new Error("Erro inesperado"));
    }
  });
}
export async function excluirAssociado(associado: AssociadoType) {
  const associados = await listarAssociados();
  const index = associados.findIndex(
    (b) =>  (associado.cpf && b.cpf === associado.cpf) || 
            (associado.cnpj && b.cnpj === associado.cnpj)
  );
  if (index !== -1) {
    associados.splice(index, 1); // Remove o associado da lista
    adicionarItem(FILENAME, associados)
      .then(() => {
        console.log("Associado excluído com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao excluir associado:", error);
      });
  } 
  else {
  throw new Error("Beneficiado não encontrado");
  }
}
