// src/services/serviePlans.ts
import { PlanType } from "@/types/PlanType";
import plans from "@/mocks/mockPlans.json";

export async function fetchPlans(): Promise<PlanType[]> {
  // Simula fetch com delay artificial
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(plans as PlanType[]);
    }, 500);
  });
}

export async function fetchPlanOptions(): Promise<{ label: string; value: number }[]> {
  const plans = await fetchPlans();
  return plans.map((plan) => ({
    label: plan.name,
    value: plan.id,
  }));
}
