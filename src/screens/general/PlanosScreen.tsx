import { useAppTheme } from "@/context/AppThemeContext";
import { CardPlan } from "@/components/CardPlan";
import type { Plan } from "@/components/CardPlan";
import { fetchPlans } from "@/services/planService";
import { ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";

export default function PlanosScreen() {
  const { theme } = useAppTheme();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetchPlans().then(setPlans);
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.basicView.backgroundColor }}
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
    >
      <Text style={theme.title}>Planos Comerciais</Text>
      <Text style={[theme.text, { marginBottom: 12 }]}>
        Conheça nossos planos de energia solar pensados para diferentes perfis de consumo.
      </Text>

      {plans.map((plan) => (
        <CardPlan key={plan.name} plan={plan} />
      ))}
    </ScrollView>
  );
}
