import { useAppTheme } from "@/context/AppThemeContext";
import { CardPlan } from "@/components/CardPlan";
import { PlanType } from "@/types/PlanType";
import { fetchPlans } from "@/services/servicePlans";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";

export default function PlanosScreen() {
  const { theme } = useAppTheme();
  const [plans, setPlans] = useState<PlanType[]>([]);

  useEffect(() => {
    fetchPlans().then(setPlans);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // ou ajustar conforme cabeçalho
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={[{ flex: 1 }]}>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.basicView.backgroundColor }}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        >
          <Text style={theme.title}>Planos Comerciais</Text>
          <Text style={[theme.text, { marginBottom: 12 }]}>
            Conheça nossos planos de energia solar pensados para diferentes perfis de consumo.
          </Text>

          {plans.map((plan) => (
            <CardPlan key={plan.name} plan={plan} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
