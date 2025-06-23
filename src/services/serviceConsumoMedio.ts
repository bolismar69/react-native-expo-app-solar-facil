import  mockConsumoMedio from "@/mocks/mockConsumoMedio.json";
import { ConsumoMedioType } from "@/types/ConsumoMedioType";

export async function fetchConsumoMedio(): Promise<ConsumoMedioType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockConsumoMedio as ConsumoMedioType[]);
    }, 500); // Simula um atraso de 500ms
  });
}

export async function fetchConsumoMedioOptions(): Promise<{ label: string; value: number }[]> {
  const consumoMedio = await fetchConsumoMedio();
  return consumoMedio.map((item) => ({
    label: item.description,
    value: item.id,
  }));
}
