import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useAppTheme } from "@/context/AppThemeContext";
import { FormBeneficiado } from "@/components/forms/FormBeneficiado";
import { fetchConcessionarias } from "@/services/serviceConcessionarias";
import { fetchConsumoMedio } from "@/services/serviceConsumoMedio";

export default function BeneficiadoScreen() {
  const { theme } = useAppTheme();
  const [concessionarias, setConcessionarias] = useState<{ label: string; value: string }[]>([]);
  const [consumoMedio, setConsumoMedio] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    // Usa diretamente o retorno do serviço
    fetchConcessionarias().then(setConcessionarias);
    fetchConsumoMedio().then(setConsumoMedio);
  }, []);

  const handleSubmit = (data: any) => {
    console.log("Beneficiado cadastrado com sucesso:", data);
    // Aqui pode integrar com API, salvar localmente, etc.
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={[{ flex: 1 }]}>
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            flexGrow: 1,
            backgroundColor: theme.screen?.backgroundColor,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ gap: 24 }}>
            <FormBeneficiado
              onSubmit={handleSubmit}
              concessionarias={concessionarias}
              consumoMedio={consumoMedio}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
