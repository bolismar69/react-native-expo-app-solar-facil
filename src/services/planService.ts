// src/services/planService.ts
import type { Plan } from "@/components/CardPlan";
import plans from "@/mocks/plans.mock.json";

export async function fetchPlans(): Promise<Plan[]> {
  // Simula fetch com delay artificial
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(plans as Plan[]);
    }, 500);
  });
}
