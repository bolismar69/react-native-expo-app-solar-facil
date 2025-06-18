import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { FormSection } from "@/components/forms/FormSection";
import { AssociadoBeneficiadoType } from "@/types/AssociadoType";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { useAppTheme } from "@/context/AppThemeContext";
import { isValidCPF, formatCPF } from "@/utils/validatorCPF";
import { brazilianStates } from "@/constants/states";

const fields: FieldDefinitionType<AssociadoBeneficiadoType>[] = [
  {
    name: "nome",
    label: "Nome completo",
    placeholder: "João Silva",
    type: "text",
    required: true,
    keyboardType: "default",
  },
  {
    name: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    type: "number",
    required: true,
    keyboardType: "numeric",
    validation: (value: string) => (isValidCPF(value) ? null : "CPF inválido"),
    // pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    errorMessage: "Formato esperado: 000.000.000-00",
    formattedValue: formatCPF,
    toUpperCase: true,
  },
  {
    name: "dataNascimento",
    label: "Data de Nascimento",
    type: "date",
    required: true,
    placeholder: "DD/MM/AAAA",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "email@email.com",
    type: "email",
    required: true,
    keyboardType: "email-address",
  },
  {
    name: "telefone",
    label: "Telefone",
    placeholder: "(11) 99999-0000",
    type: "number",
    required: true,
    keyboardType: "phone-pad",
  },
  {
    name: "endereco",
    label: "Endereço",
    placeholder: "Rua Exemplo, 123",
    type: "text",
    required: true,
    keyboardType: "default",
  },
  {
    name: "cidade",
    label: "Cidade",
    placeholder: "São Paulo",
    type: "text",
    required: true,
    keyboardType: "default",
    toUpperCase: true
  },
  {
    name: "estado",
    label: "Estado",
    placeholder: "SP",
    type: "select",
    required: true,
    keyboardType: "default",
    options: brazilianStates,
  },
  {
    name: "consumoMedio",
    label: "Consumo médio mensal (kWh)",
    placeholder: "Ex: 200",
    type: "number",
    required: true,
    keyboardType: "numeric",
  },
  {
    name: "planoDesejado",
    label: "Plano desejado",
    placeholder: "Basic / Special / Premium",
    type: "select",
    required: true,
    keyboardType: "default",
    options: [{ label: "Basic", value: "basic" },
    { label: "Special", value: "special" },
    { label: "Premium", value: "premium" },
    ]
  },
  {
    name: "aceitaTermos",
    label: "Aceito os termos de uso",
    type: "switch",
    required: true,
    placeholder: "",
  },
  {
    name: "observacoes",
    label: "Observações",
    placeholder: "Descreva aqui informações adicionais que queira nos passar...",
    type: "textarea",
    required: false
  },
];

const initial: AssociadoBeneficiadoType = {
  nome: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  telefone: "",
  endereco: "",
  cidade: "",
  estado: "",
  consumoMedio: "",
  planoDesejado: "",
  aceitaTermos: false,
  observacoes: ""
};

export function FormBeneficiado() {
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
        <FormSection
          title="Cadastro de Beneficiado"
          fields={fields}
          initialValues={initial}
          onSubmit={(data) => console.log("Beneficiado:", data)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
