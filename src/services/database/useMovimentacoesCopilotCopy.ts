import * as SQLite from "expo-sqlite";
import { MovimentacaoMensalType } from "@/types/MovimentacaoMensalType";
import { initializeDatabaseCopilot } from "./initializeDatabaseCopilot";

let db: SQLite.SQLiteDatabase | null;

export async function useMovimentacoesCopilotCopy() {
  console.log("=== INICIO ========================================================================");
  console.log("useMovimentacoesCopilot - Iniciando o hook useMovimentacoesCopilot...");

  async function initialize() {
    console.log("=== INICIO ========================================================================");
    console.log("useMovimentacoesCopilot - initialize - Inicializando o banco de dados...");
    try {
      if (!db) {
        db = await initializeDatabaseCopilot();
      }
    } catch (error) {
      console.error("useMovimentacoesCopilot - initialize - Erro ao inicializar o banco de dados:", error);
      throw error;
    }

    if (!db) {
      console.log("=== TERMINO =======================================================================");
      throw new Error("useMovimentacoesCopilot - initialize - Banco de dados não inicializado.");
    }
    console.log("useMovimentacoesCopilot - initialize - Banco de dados inicializado com sucesso.");
    console.log("=== TERMINO ========================================================================");
  }

  async function finalize() {
    console.log("=== INICIO ========================================================================");
    console.log("useMovimentacoesCopilot - finalize - Finalizando o hook useMovimentacoesCopilot...");
    if (db) {
      try {
        await db.closeAsync();
        console.log("useMovimentacoesCopilot - finalize - Banco de dados fechado com sucesso.");
      } catch (error) {
        console.error("useMovimentacoesCopilot - finalize - Erro ao fechar o banco de dados:", error);
        throw error;
      } finally {
        db = null;
        console.log("useMovimentacoesCopilot - finalize - Banco de dados finalizado.");
      }
    } else {
      console.warn("useMovimentacoesCopilot - finalize - Banco de dados já está fechado ou não foi inicializado.");
    }
    console.log("=== TERMINO ========================================================================");
  }

  async function listarMovimentacoesMensais(_associadoId: number | null): Promise<MovimentacaoMensalType[] | null> {
    console.log("=== INICIO ========================================================================");
    console.log("useMovimentacoesCopilot - listarMovimentacoesMensais - Buscando todas as movimentações mensais...");
    let movimentacoes: MovimentacaoMensalType[];
    try {
      await initialize();

      let result: any;
      if(_associadoId){
        result = await db?.getAllAsync(`SELECT * FROM movimentacoes WHERE associadoId = ? ORDER BY ano, mes;`, [_associadoId]);
      } else {
        console.warn("useMovimentacoesCopilot - listarMovimentacoesMensais - Nenhum associadoId fornecido, buscando todas as movimentações.");
        result = await db?.getAllAsync(`SELECT * FROM movimentacoes ORDER BY ano, mes;`, []);
      }
      if (!result || result.length === 0) {
        console.warn("useMovimentacoesCopilot - Nenhuma movimentação encontrada.");
        return [];
      }
      console.log("useMovimentacoesCopilot - listarMovimentacoesMensais - Movimentações encontradas:", result);
      movimentacoes = result as MovimentacaoMensalType[];
    } catch (error) {
      console.error("useMovimentacoesCopilot - listarMovimentacoesMensais - Erro ao buscar movimentações:", error);
      throw error;
    } finally {
      finalize();
    }
    console.log("useMovimentacoesCopilot - listarMovimentacoesMensais - Movimentações encontradas:", movimentacoes);
    console.log("=== TERMINO ========================================================================");
    return movimentacoes;
  }

  return { listarMovimentacoesMensais, initialize, finalize };
}
