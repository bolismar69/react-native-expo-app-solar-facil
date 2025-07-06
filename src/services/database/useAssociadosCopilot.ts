import * as SQLite from "expo-sqlite";
import { initializeDatabaseCopilot } from "./initializeDatabaseCopilot";
import { AssociadoType } from "@/types/AssociadoType";

let db: SQLite.SQLiteDatabase | null;
// let result: Promise<SQLite.SQLiteRunResult>;
let rowID: number = -1;
let numberChanges: number = -1;

export async function useAssociadosCopilot() {
  console.log("=== INICIO ========================================================================");
  console.log("useAssociadosCopilot - Iniciando o hook useAssociadosCopilot...");

  async function initialize() {
    console.log("=== INICIO ========================================================================");
    console.log("useAssociadosCopilot - initialize - Inicializando o banco de dados...");
    // Verifica se o banco de dados já foi inicializado
    try {
      if (!db) {
        db = await initializeDatabaseCopilot();
      }
    } catch (error) {
      console.error("useAssociadosCopilot - initialize - Erro ao inicializar o banco de dados:", error);
      throw error;
    }

    if (!db) {
      console.log("=== TERMINO =======================================================================");
      throw new Error("useAssociadosCopilot - initialize - Banco de dados não inicializado.");
    }
    console.log("useAssociadosCopilot - initialize - Banco de dados inicializado com sucesso.");
    console.log("=== TERMINO =======================================================================");
  }

  async function finalize() {
    console.log("=== INICIO ========================================================================");
    console.log("useAssociadosCopilot - finalize - Finalizando o hook useAssociadosCopilot...");
    // Verifica se o banco de dados foi inicializado
    if (db) {
      try {
        await db.closeAsync();
        console.log("useAssociadosCopilot - finalize - Banco de dados fechado com sucesso.");
      } catch (error) {
        console.error("useAssociadosCopilot - finalize - Erro ao fechar o banco de dados:", error);
        throw error;
      } finally {
        db = null; // Limpa a referência do banco de dados
        console.log("useAssociadosCopilot - finalize - Banco de dados finalizado.");
      }
    } else {
      console.warn("useAssociadosCopilot - finalize - Banco de dados já está fechado ou não foi inicializado.");
      console.log("=== TERMINO =======================================================================");
    }
  }
  
  async function insertRecord(associado: AssociadoType): Promise< { numberChanges: number; rowID: number }> {
    console.log("=== INICIO ========================================================================");
    console.log("useAssociadosCopilot - insertRecord - Inserindo associado:", associado);
    try {
      
      await initialize(); 

      // gerar o id
      associado.id = (Date.now().toString(36) + Math.random().toString(36)).slice(2);
      
      const result = await db?.runAsync(
        `INSERT INTO associados (id, nome, email, telefone, tipoPessoa, cpf_cnpj, senha, tipoAssociado, status, dataCadastro, dataAtualizacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          associado.id,
          associado.nome,
          associado.email,
          associado.telefone,
          associado.tipoPessoa,
          associado.cpf_cnpj,
          associado.senha,
          associado.tipoAssociado,
          associado.status,
          associado.dataCadastro,
          associado.dataAtualizacao,
        ]
      );

      console.log("useAssociadosCopilot - insertRecord - Associado inserido com sucesso:", result);
      numberChanges = result?.changes ?? -1;
      rowID = result?.lastInsertRowId ?? -1;
    } catch (error) {
      console.error("useAssociadosCopilot - insertRecord - Erro ao inserir associado:", error);
      console.log("=== TERMINO =======================================================================");
      throw error;
    } finally {
      finalize();
    }
    console.log("=== TERMINO =======================================================================");
    return { numberChanges, rowID };
  }

  async function updateRecord(associado: AssociadoType): Promise< { numberChanges: number; rowID: number }> {
    try {
      
      await initialize(); 

      const result = await db?.runAsync(
        `UPDATE associados SET nome = ?, email = ?, telefone = ?, tipoPessoa = ?, senha = ?, tipoAssociado = ?, status = ?, dataAtualizacao = ?
        WHERE id = ?;`,
        [
          associado.nome,
          associado.email,
          associado.telefone,
          associado.tipoPessoa,
          associado.cpf_cnpj,
          associado.senha,
          associado.tipoAssociado,
          associado.status,
          associado.dataCadastro,
          associado.dataAtualizacao,
          associado.id, // O ID é usado para identificar o registro a ser atualizado
        ]
      );
      numberChanges = result?.changes ?? -1;
      rowID = associado.id ? parseInt(associado.id, 10) : -1;
      console.log("useAssociados - Associado atualizado com sucesso:", result);
    } catch (error) {
      console.error("useAssociados - Erro ao atualizar associado:", error);
      throw error;
    } finally {
      finalize();
    }
    return { numberChanges, rowID };
  }

  async function deleteRecord(id: string): Promise< { numberChanges: number; rowID: number }> {
    try {
      
      await initialize(); 

      const result = await db?.runAsync(
          `DELETE FROM associados WHERE id = ?;`,
          [id],
      );
      numberChanges = result?.changes ?? -1;
      rowID = id ? parseInt(id, 10) : -1;
      console.log("useAssociados - Associado deletado com sucesso.");
    } catch (error) {
      console.error("useAssociados - Erro ao deletar associado:", error);
      throw error;
    } finally {
      finalize();
    }
    return { numberChanges, rowID };
  }

  async function searchById(id: string): Promise<AssociadoType[] | null> {
    let associado: AssociadoType[];
    try {
      
      await initialize(); 

      const statement = `SELECT * FROM associados WHERE id = ?;`;
      const result = await db?.getAllAsync(statement, [id]);
      if (result === undefined || result === null || result.length === 0) {
        console.warn("useAssociados - Nenhum associado encontrado com o ID:", id);
        return []; // Return an empty array if no records are found
      }
      associado = result as AssociadoType[];
    } catch (error) {
      console.error("useAssociados - Erro ao buscar associado:", error);
      throw error;
    } finally {
      finalize();
    }
    return associado;
  }

  async function searchByCpfCnpj(cpf_cnpj: string): Promise<AssociadoType[] | null> {
    console.log("=== INICIO ========================================================================");
    console.log("useAssociadosCopilot - searchByCpfCnpj - Buscando associado por CPF/CNPJ:", cpf_cnpj);

    let associado: AssociadoType[];
    try {
      
      await initialize(); 

      const statement = `SELECT * FROM associados WHERE cpf_cnpj = ?;`;
      const result = await db?.getAllAsync(statement, [cpf_cnpj]);
      if (result === undefined || result === null || result.length === 0) {
        console.warn("useAssociados - Nenhum associado encontrado com o CPF/CNPJ:", cpf_cnpj);
        return []; // Return an empty array if no records are found
      }
      associado = result as AssociadoType[];
    } catch (error) {
      console.error("useAssociadosCopilot - searchByCpfCnpj - Erro ao buscar associado:", error);
      console.log("=== TERMINO =======================================================================");
      throw error;
    } finally {
      finalize();
    }
    console.log("useAssociadosCopilot - searchByCpfCnpj - Associado encontrado:", associado);
    console.log("=== TERMINO =======================================================================");
    return associado;
  }

  async function searchByCpfCnpjSenha(cpf_cnpj: string, senha: string): Promise<AssociadoType[] | null> {
    console.log("=== INICIO ========================================================================");
    console.log("useAssociadosCopilot - searchByCpfCnpjSenha - Buscando associado por CPF/CNPJ e Senha:", cpf_cnpj, senha);
    let associado: AssociadoType[];
    try {
      
      await initialize(); 

      const statement = `SELECT * FROM associados WHERE cpf_cnpj = ? AND senha = ?;`;
      const result = await db?.getAllAsync(statement, [cpf_cnpj, senha]);
      if (result === undefined || result === null || result.length === 0) {
        console.warn("useAssociados - Nenhum associado encontrado com o CPF/CNPJ e Senha:", cpf_cnpj, senha);
        return []; // Return an empty array if no records are found
      }
      associado = result as AssociadoType[];
    } catch (error) {
      console.error("useAssociados - Erro ao buscar associado:", error);
      console.log("=== TERMINO =======================================================================");
      throw error;
    } finally {
      finalize();
    }
    console.log("useAssociadosCopilot - searchByCpfCnpjSenha - Associado encontrado:", associado);
    console.log("=== TERMINO =======================================================================");
    return associado;
  }

  async function searchAll(): Promise<AssociadoType[] | null> {
    let associado: AssociadoType[];
    try {
      
      await initialize(); 

      const statement = `SELECT * FROM associados;`;
      const result = await db?.getAllAsync(statement, []);
      if (result === undefined || result === null || result.length === 0) {
        console.warn("useAssociados - Nenhum associado encontrado");
        return []; // Return an empty array if no records are found
      }
      associado = result as AssociadoType[];
    }
    catch (error) {
      console.error("useAssociados - Erro ao buscar associados:", error);
      throw error;
    } finally {
      finalize();
    }
    return associado;
  }

  // Retorna as funções para serem usadas em outros lugares
  return { insertRecord, updateRecord, deleteRecord, searchById, searchByCpfCnpj, searchByCpfCnpjSenha, searchAll, initialize, finalize, };
}
