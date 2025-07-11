// /src/services/database/useAssociadosCopilot.ts
import * as SQLite from "expo-sqlite";
import { AssociadoType } from "@/types/AssociadoType";
import { initializeDatabaseCopilot } from "./initializeDatabaseCopilot";
import { seedMovimentacoes } from "./seedMovimentacoes";

let db: SQLite.SQLiteDatabase | null;
// let result: Promise<SQLite.SQLiteRunResult>;
let rowID: number = -1;
let numberChanges: number = -1;

export async function useAssociadosCopilotCopy() {
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

      // gerar o id, usando o cpf_cnpj, removendo os caracteres nao numericos
      associado.id = parseInt(associado.cpf_cnpj.replace(/\D/g, ""), 10);
      console.log("useAssociadosCopilot - insertRecord - ID gerado:", associado.id);

      const result = await db?.runAsync(
        `INSERT INTO associados (id, nome, email, telefone, tipoPessoa, cpf_cnpj, senha, tipoAssociado, status, dataCadastro, dataAtualizacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          // usa o cpf_cnpj como o id do associado
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

      // vamos chamar a função seedMovimentacoes para inserir os registros de movimentação
      try {

        console.log("useAssociadosCopilot - insertRecord - Inserindo movimentações para o associado:", associado.id);

        await seedMovimentacoes(associado.id, db!);

        console.log("useAssociadosCopilot - insertRecord - Movimentações inseridas com sucesso para o associado:", associado.id);

      } catch (error) {
        console.error("useAssociadosCopilot - insertRecord - Erro ao inserir movimentações para o associado:", error);
      }

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
    console.log("=== INICIO ========================================================================");
    console.info("useAssociadosCopilot - updateRecord - Iniciando a atualização do registro:", associado.id," ==> ",associado);
    try {

      await initialize(); 

      const result = await db?.runAsync(
        `UPDATE associados SET 
          nome = ?, 
          email = ?, 
          telefone = ?, 
          tipoPessoa = ?, 
          cpf_cnpj = ?, 
          senha = ?, 
          tipoAssociado = ?, 
          status = ?, 
          dataCadastro = ?, 
          dataAtualizacao = ?, 
          cep = ?, 
          endereco = ?, 
          numero = ?, 
          bairro = ?, 
          cidade = ?, 
          estado = ?, 
          complemento = ?, 
          aceitaTermos = ?, 
          observacoes = ?, 
          dataNascimento = ?, 
          nomeSocial = ?, 
          dataAbertura = ?, 
          razaoSocial = ?, 
          nomeFantasia = ?, 
          nomeConcessionaria = ?, 
          consumoMedio = ?, 
          planoDesejado = ?, 
          potenciaInstalada = ?, 
          disponibilidade = ?, 
          tipoConexao = ?
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
          associado.cep,
          associado.endereco,
          associado.numero,
          associado.bairro,
          associado.cidade,
          associado.estado,
          associado.complemento,
          associado.aceitaTermos,
          associado.observacoes,
          associado.dataNascimento,
          associado.nomeSocial,
          associado.dataAbertura,
          associado.razaoSocial,
          associado.nomeFantasia,
          associado.nomeConcessionaria,
          associado.consumoMedio,
          associado.planoDesejado,
          associado.potenciaInstalada,
          associado.disponibilidade,
          associado.tipoConexao,
          associado.id,// O ID é usado para identificar o registro a ser atualizado
        ]
      );
      numberChanges = result?.changes ?? -1;
      rowID = associado.id ? associado.id : -1;
      console.log("useAssociadosCopilot - updateRecord - Associado atualizado com sucesso:", result);
    } catch (error) {
      console.error("useAssociadosCopilot - updateRecord - Erro ao atualizar associado:", error);
      console.log("=== TERMINO =======================================================================");
      throw error;
    } finally {
      finalize();
    }
    console.log("useAssociadosCopilot - updateRecord - Associado atualizado com sucesso - result=> [", { numberChanges, rowID }, "] - associado =>", associado);
    console.log("=== TERMINO =======================================================================");
    return { numberChanges, rowID };
  }

  async function deleteRecord(id: number): Promise< { numberChanges: number; rowID: number }> {
    try {
      
      await initialize(); 

      const result = await db?.runAsync(
          `DELETE FROM associados WHERE id = ?;`,
          [id],
      );
      numberChanges = result?.changes ?? -1;
      rowID = id ? id : -1;
      console.log("useAssociadosCopilot - Associado deletado com sucesso.");
    } catch (error) {
      console.error("useAssociadosCopilot - Erro ao deletar associado:", error);
      throw error;
    } finally {
      finalize();
    }
    return { numberChanges, rowID };
  }

  async function searchById(id: number): Promise<AssociadoType[] | null> {
    let associado: AssociadoType[];
    try {
      
      await initialize(); 

      const result = await db?.getAllAsync(`SELECT * FROM associados WHERE id = ?;`, [id]);
      if (result === undefined || result === null || result.length === 0) {
        console.warn("useAssociadosCopilot - Nenhum associado encontrado com o ID:", id);
        return []; // Return an empty array if no records are found
      }
      associado = result as AssociadoType[];
    } catch (error) {
      console.error("useAssociadosCopilot - Erro ao buscar associado:", error);
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
        console.warn("useAssociadosCopilot - Nenhum associado encontrado com o CPF/CNPJ:", cpf_cnpj);
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
        console.warn("useAssociadosCopilot - Nenhum associado encontrado com o CPF/CNPJ e Senha:", cpf_cnpj, senha);
        return []; // Return an empty array if no records are found
      }
      associado = result as AssociadoType[];
    } catch (error) {
      console.error("useAssociadosCopilot - Erro ao buscar associado:", error);
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
  console.log("=== INICIO ========================================================================");
  console.log("useAssociadosCopilot - searchAll - Buscando todos os associados...");
    let associado: AssociadoType[];
    try {
      
      await initialize(); 

      const result = await db?.getAllAsync(`SELECT * FROM associados;`, []);
      if (result === undefined || result === null || result.length === 0) {
        console.warn("useAssociadosCopilot - Nenhum associado encontrado");
        return []; // Return an empty array if no records are found
      }
      associado = result as AssociadoType[];
    }
    catch (error) {
      console.error("useAssociadosCopilot - Erro ao buscar associados:", error);
      console.log("=== TERMINO =======================================================================");
      throw error;
    } finally {
      finalize();
    }
    console.log("useAssociadosCopilot - searchAll - Associados encontrados:", associado);
    console.log("=== TERMINO =======================================================================");
    return associado;
  }

  // Retorna as funções para serem usadas em outros lugares
  return { insertRecord, updateRecord, deleteRecord, searchById, searchByCpfCnpj, searchByCpfCnpjSenha, searchAll, initialize, finalize, };
}
