// src/services/storage/storageUtils.ts
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DOC_DIR = (FileSystem.documentDirectory || "");
const BASE_DIR = FileSystem.documentDirectory + "storage/";

/**
 * Garante que o diretório base exista
 */
async function ensureDirExists() {
  console.log("Verificando se o diretório base existe...", BASE_DIR);
  const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
  if (!dirInfo.exists) {
    console.log("Diretório base não encontrado. Criando diretório...", BASE_DIR);
    await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });
    console.log("Diretório base criado com sucesso.", BASE_DIR);
  }
}

// Apaga o diretório base e recria, garantindo que o armazenamento esteja limpo
export async function resetStorage(): Promise<void> {
  console.log("Iniciando o processo de reset do armazenamento...");
  try {
    console.log("Verificando se o diretório base existe...", BASE_DIR);
    const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
    if (dirInfo.exists) {
      console.log("Diretório base encontrado. Limpando armazenamento...", BASE_DIR);
      await FileSystem.deleteAsync(BASE_DIR, { idempotent: true });
    }
    console.log("Criando diretório base novamente...", BASE_DIR);
    await ensureDirExists();
    console.log("Armazenamento resetado com sucesso.", BASE_DIR);
  } catch (error) {
    console.error("Erro ao resetar armazenamento:", error);
  }
}

export async function clearStorageDocumentDirectory(): Promise<void> {
  console.log("Iniciando o processo de reset do armazenamento...", " - DOC_DIR => ", DOC_DIR);
  try {
    console.log("Verificando se o diretório base existe...");
    const dirInfo = await FileSystem.getInfoAsync(DOC_DIR);
    if (dirInfo.exists) {
      console.log("Diretório base encontrado. Limpando armazenamento...");
      await FileSystem.deleteAsync(DOC_DIR, { idempotent: true });
      console.log("Armazenamento limpo com sucesso.");
    }
  } catch (error) {
    console.error("Erro ao resetar armazenamento:", error);
  }
}

// Funções de armazenamento
export async function limparArmazenamento(): Promise<void> {
  console.log("Iniciando o processo de limpeza do armazenamento...");
  try {
    console.log("Verificando se o diretório base existe...", BASE_DIR);
    const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
    if (dirInfo.exists) {
      console.log("Diretório base encontrado. Limpando armazenamento...", BASE_DIR);
      await FileSystem.deleteAsync(BASE_DIR, { idempotent: true });
      console.log("Armazenamento limpo com sucesso.", BASE_DIR);
    }
    await ensureDirExists();
  } catch (error) {
    console.error("Erro ao limpar armazenamento:", error);
  }
}

export async function salvarLista<T>(filename: string, data: T[]): Promise<void> {
  console.log(`Iniciando o processo de salvar lista em ${filename}...`, " - BASE_DIR => ", BASE_DIR, "filename => ", filename, "data => ", "Dados:", data);
  await ensureDirExists();
  const fileUri = BASE_DIR + filename;
  const json = JSON.stringify(data, null, 2);
  console.log(`Salvando lista em ${fileUri}...`, "JSON => ", json);
  await FileSystem.writeAsStringAsync(fileUri, json);
}

export async function carregarLista<T>(filename: string): Promise<T[]> {
  console.log(`Iniciando o processo de carregar lista de ${filename}...`, " - BASE_DIR => ", BASE_DIR);
  try {
    const fileUri = BASE_DIR + filename;
    console.log(`Carregando lista de fileUri =>  ${fileUri}...`);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    console.log(`Verificando se o arquivo existe: ${fileInfo}`);
    if (!fileInfo.exists) return [];
    console.log(`Arquivo encontrado. Lendo conteúdo de ${fileUri}...`);
    const content = await FileSystem.readAsStringAsync(fileUri);
    console.log(`Conteúdo lido de ${fileUri}:`, content);
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

export async function salvarListaV2<T>(filename: string, lista: T[]): Promise<void> {
  const fileUri = BASE_DIR + filename;
  console.log(`Iniciando o processo de salvar lista V2 em ${filename}...`, " - BASE_DIR => ", BASE_DIR, "filename => ", filename, "data => ", lista);
  try {
    await ensureDirExists();
    const jsonValue = JSON.stringify(lista);
    await AsyncStorage.setItem(fileUri, jsonValue);
  } catch (error) {
    throw new Error("Erro ao salvar lista" + fileUri + ": " + error  );
  }
}
