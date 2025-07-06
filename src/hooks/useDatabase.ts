// src/hooks/useDatabase.ts
import { useEffect } from "react";
import {initializeDatabase} from "@/services/database/initializeDatabase";

export function useDatabase() {
  useEffect(() => {
    const initDatabase = async () => {
      try {
        // await createAssociadoTable(db);
        // await createMovimentacaoTable(db);
        await initializeDatabase();
        console.log("Tabelas SQLite inicializadas com sucesso");
      } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
      }
    };

    initDatabase();
  }, []);
}
