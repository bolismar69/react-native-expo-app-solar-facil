// src/hooks/useDatabase.ts
import { useEffect } from "react";
import { AssociadoRepository   } from "@/services/database/AssociadoRepository";
import { MovimentacaoRepository } from "@/services/database/MovimentacaoRepository";

export function useDatabasecopy() {
  useEffect(() => {
    const initDatabase = async () => {
      try {
        await AssociadoRepository.createTable();
        await MovimentacaoRepository.createTable();
        console.log("Tabelas SQLite inicializadas com sucesso");
      } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
      }
    };

    initDatabase();
  }, []);
}
