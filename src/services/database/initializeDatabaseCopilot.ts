import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null;

export async function initializeDatabaseCopilot(): Promise<SQLite.SQLiteDatabase | null> {
  console.log("=== INICIO ========================================================================");
  console.log("initializeDatabase - Iniciando o processo de inicialização do banco de dados...");

  try {
    if (!db) {
      db = await SQLite.openDatabaseAsync("solarfacil.db");
    }
    if (!db) {
      throw new Error("initializeDatabase - Erro ao abrir o banco de dados.");
    }
    console.log("initializeDatabase - Banco de dados aberto com sucesso.");

    // ****************************************************************************************************************
    // testar se a conexão com o banco de dados está funcionando
    console.log("initializeDatabase - Validando se a conexão com o banco de dados esta funcionando ...");
    try {
      await db.getAllAsync("SELECT 1").then(() => {
        console.log("initializeDatabase - Conexão com o banco de dados testada com sucesso.");
      });
    } catch (error) {
      console.error("initializeDatabase - Erro ao testar o funcionamento da conexão com o banco de dados:", error);
      console.info("initializeDatabase - Tentando fechar o banco de dados e reabri-lo...");

      // **************************************************************************************************************
      // aqui vamos forçar o fechamento do banco de dados para abri-lo novamente
      await db.closeAsync()
      .then(() => {
        console.info("initializeDatabase - Banco de dados fechado com sucesso.");
      })
      .catch((error) => {
        console.error("initializeDatabase - Erro ao fechar o banco de dados:", error);
      })
      .finally(() => {
        console.info("initializeDatabase - Setando db=null...");
        db = null;
      });
      console.info("initializeDatabase - Banco de dados fechado com sucesso.");
      console.info("initializeDatabase - Setando db=null...");
      db = null;

      // **************************************************************************************************************
      // aqui vamos tentar abrir o banco de dados novamente
      console.info("initializeDatabase - Tentando reabrir o banco de dados...");
      db = await SQLite.openDatabaseAsync("solarfacil.db");
      if (!db) {
        console.error("initializeDatabase - Erro ao tentar reabrir o banco de dados.");
        throw new Error("initializeDatabase - Erro ao tentar reabrir o banco de dados.");
      }
      console.log("initializeDatabase - Banco de dados reaberto com sucesso.");
    }

    // ****************************************************************************************************************
    // Verifica se as tabelas já existem antes de criá-las
    console.log("initializeDatabase - Verificando se as tabelas já existem...");
    const tables = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table'");

    console.log("initializeDatabase - Tabelas encontradas:", tables);
    const tableNames = tables.map((table: any) => table.name);

    // se tablesNames não contiver as tabelas, cria as tabelas
    console.log("initializeDatabase - Verificando se a tabela 'associados' já existe...");
    if (!tableNames.includes("associados")) {
      await new Promise<void>((resolve, reject) => {
        db?.execAsync(
            `CREATE TABLE IF NOT EXISTS associados (
              id TEXT PRIMARY KEY NOT NULL,
              nome TEXT,
              email TEXT,
              telefone TEXT,
              tipoPessoa TEXT,
              cpf_cnpj TEXT UNIQUE,
              senha TEXT,
              tipoAssociado TEXT,
              status TEXT,
              dataCadastro TEXT,
              dataAtualizacao TEXT
            );`)
          .then(() => {
            console.log("initializeDatabase - Tabela 'associados' criada com sucesso.");
            resolve();
          })
          .catch((error) => {
            console.error("initializeDatabase - Erro ao criar tabela 'associados':", error);
            reject(error);
          });

      });
    } else {
      console.info("initializeDatabase - Tabela 'associados' já existe.");

      // apaga todos os registors da tabela de associados
      // console.info("initializeDatabase - Apagando todos os registros da tabela 'associados'...");
      // db?.execAsync(`DELETE FROM associados;`);
      // console.info("initializeDatabase - Registros da tabela 'associados' apagados com sucesso.");
    }

    console.log("initializeDatabase - Verificando se a tabela 'movimentacoes' já existe...");
    if (!tableNames.includes("movimentacoes")) {
      await new Promise<void>((resolve, reject) => {
        db?.execAsync(
            `CREATE TABLE IF NOT EXISTS movimentacoes (
              id TEXT PRIMARY KEY NOT NULL,
              associadoId TEXT,
              mes INTEGER,
              ano INTEGER,
              valorTotal REAL,
              dataCadastro TEXT
            );`)
          .then(() => {
            console.log("initializeDatabase - Tabela 'movimentacoes' criada com sucesso.");
            resolve();
          })
          .catch((error) => {
            console.error("initializeDatabase - Erro ao criar tabela 'movimentacoes':", error);
            reject(error);
          });
      });
    } else {
      console.info("initializeDatabase - Tabela 'movimentacoes' já existe.");
    }

    console.log("initializeDatabase - Verificando se a tabela 'movimentacoes_detalhes' já existe...");
    if (!tableNames.includes("movimentacoes_detalhes")) {
      await new Promise<void>((resolve, reject) => {
        db?.execAsync(
            `CREATE TABLE IF NOT EXISTS movimentacoes_detalhes (
              id TEXT PRIMARY KEY NOT NULL,
              movimentacaoId TEXT,
              energiaRecebidaKwh REAL,
              valorEnergiaRecebida REAL,
              tarifaUnitariaKwh REAL,
              valorCobrado REAL,
              dataVencimento TEXT,
              dataPagamento TEXT,
              statusPagamento TEXT,
              observacoes TEXT,
              criadoEm TEXT,
              atualizadoEm TEXT
            );`)
          .then(() => {
            console.log("initializeDatabase - Tabela 'movimentacoes_detalhes' criada com sucesso.");
            resolve();
          })
          .catch((error) => {
            console.error("initializeDatabase - Erro ao criar tabela 'movimentacoes_detalhes':", error);
            reject(error);
          });
      });
    } else {
      console.info("initializeDatabase - Tabela 'movimentacoes_detalhes' já existe.");
    }

    console.log("initializeDatabase - Banco de dados inicializado com sucesso.");
    console.log("=== TERMINO =======================================================================");
    return db;
  } catch (error) {
    console.error("initializeDatabase - Erro ao inicializar o banco de dados:", error);
    console.log("=== TERMINO =======================================================================");
    throw error;
  }
}
