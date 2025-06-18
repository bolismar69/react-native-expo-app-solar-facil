// src/components/forms/FormBeneficiado.tsx
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { FormSection } from "@/components/forms/FormSection";
import { AssociadoBeneficiadoType } from "@/types/AssociadoType";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { useAppTheme } from "@/context/AppThemeContext";
import { isValidCPF, formatCPF } from "@/utils/validatorCPF";
import { brazilianStates } from "@/constants/states";

const fields: FieldDefinitionType<AssociadoBeneficiadoType>[] = [
  { name: "nome", label: "Nome completo", placeholder: "João Silva", type: "text", required: true, keyboardType: "default" },
  {
    name: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    type: "text",
    required: true,
    keyboardType: "numeric",
    pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    errorMessage: "Formato inválido. Use: 000.000.000-00",
    validation: (value: string) => {
      if (!isValidCPF(value)) return "CPF inválido";
      return null;
    },
    formattedValue: formatCPF, // ✅ Usa formatação visual
  },
  { name: "email", label: "Email", placeholder: "email@email.com", type: "email", required: true, keyboardType: "email-address" },
  { name: "telefone", label: "Telefone", placeholder: "(11) 99999-0000", type: "text", required: true, keyboardType: "phone-pad" },
  { name: "endereco", label: "Endereço", placeholder: "Rua Exemplo, 123", type: "text", required: true, keyboardType: "default" },
  { name: "cidade", label: "Cidade", placeholder: "São Paulo", type: "text", required: true, keyboardType: "default" },
  { name: "estado", label: "Estado", placeholder: "Selecione seu estado", type: "text", required: true, keyboardType: "default", options: brazilianStates, },
  { name: "consumoMedio", label: "Consumo médio mensal (kWh)", placeholder: "Ex: 200", type: "text", required: true, keyboardType: "numeric" },
  {
    name: "planoDesejado",
    label: "Plano desejado",
    placeholder: "Basic / Special / Premium",
    type: "text",
    required: true,
    keyboardType: "default",
    options: [{ label: "Basic", value: "basic" },
    { label: "Special", value: "special" },
    { label: "Premium", value: "premium" },
    ]
  },
];

const initial: AssociadoBeneficiadoType = {
  nome: "",
  cpf: "",
  email: "",
  telefone: "",
  endereco: "",
  cidade: "",
  estado: "",
  consumoMedio: "",
  planoDesejado: "",
  aceitaTermos: false,
  observacoes: "",
  dataNascimento: "",
};

export function FormBeneficiadoV1() {
  const { theme } = useAppTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={[{ padding: 16, backgroundColor: theme.screen.backgroundColor }]}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* <FormSection fields={fields} initialValues={initial} /> */}
        <FormSection
          title="Cadastro de Beneficado"
          fields={fields}
          initialValues={initial}
          onSubmit={(data) => console.log("Beneficado :", data)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
