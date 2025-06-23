import  mockConcessionaria  from "@/mocks/mockConcessionarias.json";
import { ConcessionariaType } from "@/types/ConcessionariaType";

export async function fetchConcessionarias(): Promise<ConcessionariaType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const activeConcessionarias = mockConcessionaria.filter((concessionaria) => concessionaria.status === "active");
      resolve(activeConcessionarias as ConcessionariaType[]);
    }, 500); // Simula um atraso de 500ms
  });
}

export async function fetchConcessionariasOptions(): Promise<{ label: string; value: number }[]> {
  const plans = await fetchConcessionarias();
  return plans.map((plan) => ({
    label: plan.name,
    value: plan.id,
  }));
}
