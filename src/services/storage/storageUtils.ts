// src/services/storage/storageUtils.ts
import * as FileSystem from "expo-file-system";

const BASE_DIR = FileSystem.documentDirectory + "storage/";

/**
 * Garante que o diretório base exista
 */
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });
  }
}

export async function salvarLista<T>(filename: string, data: T[]): Promise<void> {
  await ensureDirExists();
  const fileUri = BASE_DIR + filename;
  const json = JSON.stringify(data, null, 2);
  await FileSystem.writeAsStringAsync(fileUri, json);
}

export async function carregarLista<T>(filename: string): Promise<T[]> {
  try {
    const fileUri = BASE_DIR + filename;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) return [];
    const content = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Erro ao carregar ${filename}:`, error);
    return [];
  }
}

export async function adicionarItem<T>(filename: string, novoItem: T): Promise<void> {
  const lista = await carregarLista<T>(filename);
  lista.push(novoItem);
  await salvarLista<T>(filename, lista);
}

export async function removerItem<T>(filename: string, predicate: (item: T) => boolean): Promise<void> {
  const lista = await carregarLista<T>(filename);
  const novaLista = lista.filter((item) => !predicate(item));
  await salvarLista<T>(filename, novaLista);
}
