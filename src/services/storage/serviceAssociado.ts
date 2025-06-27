// /src/services/storage/serviceAssociado.ts
import { adicionarItem, carregarLista, salvarListaV2 } from "@/services/storage/storageUtils";
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
            (b) =>  (b.cpf_cnpj === associado.cpf_cnpj));
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
  console.log("Iniciando o processo de listar associados");
  try {
    const associados = await carregarLista<AssociadoType>(FILENAME);
    console.log("Lista de associados carregada com sucesso:", associados.length, "=> ", associados);
    return associados;
  } catch (error) {
    console.error("Erro ao carregar lista de associados:", error);
    throw new Error("Erro ao carregar lista de associados");
  }
}

// export async function atualizarAssociado(associado: AssociadoType): Promise<string> {
//   return new Promise((resolve, reject) => {
//     console.log("Iniciando o processo de atualizar associado:", associado);
//     try {
//       setTimeout(() => {
//         // Carregar lista de associados
//         const associados = carregarLista<AssociadoType>(FILENAME);
//         associados.then((lista) => {
//           // Verificar se o associado existe
//           const index = lista.findIndex(
//             (b) =>  (b.cpf_cnpj === associado.cpf_cnpj));
//           if (index === -1) {
//             reject(new Error("Associado não encontrado"));
//             return; // Ensure no further execution
//           }

//           console.log("Atualizando associado:", associado);
//           lista[index] = associado; // Atualiza o associado na lista
//           adicionarItem(FILENAME, lista)
//             .then(() => {
//               console.log("Associado atualizado com sucesso:", associado);
//               resolve("Associado atualizado com sucesso");
//             })
//             .catch((error) => {
//               console.error("Erro ao atualizar associado:", error);
//               reject(new Error("Erro ao atualizar associado"));
//             });
//         }).catch((error) => {
//           console.error("Erro ao carregar lista de associados:", error);
//           reject(new Error("Erro ao carregar lista de associados"));
//         });
//       }, 500); // Simulação de delay
//     } catch (error) {
//       console.error("Erro inesperado:", error);
//       reject(new Error("Erro inesperado"));
//     }
//   });
// }

export async function excluirAssociado(associado: AssociadoType) {
  const associados = await listarAssociados();
  const index = associados.findIndex(
    (b) =>  (b.cpf_cnpj === associado.cpf_cnpj ) );
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
export async function buscarAssociadoPorCpfCnpj(cpf_cnpj: string): Promise<AssociadoType[]> {
  console.log("Iniciando o processo de busca de associado por CPF:", cpf_cnpj);
  try {
    const associados = await carregarLista<AssociadoType>(FILENAME);
    const associado = associados.find((b) => b.cpf_cnpj === cpf_cnpj);
    if (associado) {
      return [associado]; // Retorna o associado encontrado
    }
    // If not found, return an empty array
    console.log("Associado não encontrado com o CPF:", cpf_cnpj);
    return [];
  } catch (error) {
    console.error("Erro ao buscar associado por CPF:", error);
    throw new Error("Erro ao buscar associado por CPF");
  }
}
export async function buscarAssociadoPorId(id: string): Promise<AssociadoType[]> {
  console.log("Iniciando o processo de busca de associado por ID:", id);
  try {
    const associados = await carregarLista<AssociadoType>(FILENAME);
    const associado = associados.find((b) => b.id === id);
    if (associado) {
      return [associado]; // Retorna o associado encontrado
    }
    // If not found, return null
    console.log("Associado não encontrado com o ID:", id);
    return [];
  } catch (error) {
    console.error("Erro ao buscar associado por ID:", error);
    throw new Error("Erro ao buscar associado por ID");
  }
}
export async function buscarAssociadoPorCpfCnpjSenha(cpf_cnpj: string, senha: string): Promise<AssociadoType[]> {
  console.log("Iniciando o processo de busca de associado por CPF:", cpf_cnpj);
  try {
    const associados = await carregarLista<AssociadoType>(FILENAME);
    const associado = associados.find((b) => b.cpf_cnpj === cpf_cnpj && b.senha === senha);
    if (associado) {
      return [associado]; // Retorna o associado encontrado
    }
    // If not found, return an empty array
    console.log("Associado não encontrado com o CPF:", cpf_cnpj);
    return [];
  } catch (error) {
    console.error("Erro ao buscar associado por CPF:", error);
    throw new Error("Erro ao buscar associado por CPF");
  }
}

export async function atualizarAssociado(associado: AssociadoType): Promise<string> {
  console.log("Iniciando o processo de atualizar associado:", associado);
  return new Promise((resolve, reject) => {
    try {
      console.log("Aguardando 500ms antes de atualizar associado...");
      setTimeout(() => {
        console.log("Carregando lista de associados para atualização... => ", FILENAME);
        carregarLista<AssociadoType>(FILENAME).then((lista) => {
          console.log("Lista de associados carregada com sucesso:", lista.length, "=> ", lista);
          const index = lista.findIndex((b) => b.cpf_cnpj === associado.cpf_cnpj);
          if (index === -1) {
            console.error("Associado não encontrado para atualização:", associado.cpf_cnpj);
            reject(new Error("Associado não encontrado"));
            return;
          }

          console.log("Atualizando associado:", index, " => ", associado);
          lista[index] = associado; // Atualiza o item
          console.log("Salvando lista - completa - atualizada de associados...");
          salvarListaV2(FILENAME, lista)
            .then(() => {
              console.log("Associado atualizado com sucesso:", associado);
              resolve("Associado atualizado com sucesso");
            })
            .catch((error) => {
              console.error("Erro ao salvar lista:", error);
              reject(new Error("Erro ao atualizar associado"));
            });
        }).catch((error) => {
          console.error("Erro ao carregar lista de associados:", error);
          reject(new Error("Erro ao carregar lista"));
        });
      }, 0);
    } catch (error) {
      console.error("Erro inesperado:", error);
      reject(new Error("Erro inesperado"));
    }
  });
}
