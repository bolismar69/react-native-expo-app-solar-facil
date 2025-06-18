// src/components/forms/FormFornecedor.tsx
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { FormSection } from "@/components/forms/FormSection";
import { AssociadoFornecedorType } from "@/types/AssociadoType";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { useAppTheme } from "@/context/AppThemeContext";
import { isValidCNPJ, formatCNPJ } from "@/utils/validatorCNPJ";
import { brazilianStates } from "@/constants/states";

const fields: FieldDefinitionType<AssociadoFornecedorType>[] = [
  {
    name: "nome",
    label: "Nome completo",
    placeholder: "Digite seu nome",
    keyboardType: "default",
    required: true,
    type: "text",
  },
  {
    name: "email",
    label: "E-mail",
    placeholder: "exemplo@email.com",
    keyboardType: "email-address",
    required: true,
    type: "email",
  },
  {
    name: "telefone",
    label: "Telefone",
    placeholder: "(11) 91234-5678",
    keyboardType: "phone-pad",
    required: true,
    type: "text",
  },
  {
    name: "cnpj",
    label: "CNPJ",
    placeholder: "12.345.678/0001-90",
    type: "text",
    required: true,
    keyboardType: "numeric",
    pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    errorMessage: "Formato inválido. Use: 00.000.000/0000-00",
    validation: (value: string) => {
      if (!isValidCNPJ(value)) return "CNPJ inválido";
      return null;
    },
    formattedValue: formatCNPJ,
  },
  {
    name: "dataFundacao",
    label: "Data de Nascimento",
    type: "date",
    required: true,
    placeholder: "DD/MM/AAAA",
  },
  {
    name: "endereco",
    label: "Endereço",
    placeholder: "Rua, número, bairro",
    keyboardType: "default",
    required: true,
    type: "text",
  },
  {
    name: "cidade",
    label: "Cidade",
    placeholder: "São Paulo",
    keyboardType: "default",
    required: true,
    type: "text",
  },
  {
    name: "estado",
    label: "Estado",
    placeholder: "Selecione seu estado",
    keyboardType: "default",
    required: true,
    type: "select",
    options: brazilianStates,
  },
  {
    name: "potenciaInstalada",
    label: "Potência Instalada (kW)",
    placeholder: "Ex: 10",
    keyboardType: "numeric",
    required: true,
    type: "number",
  },
  {
    name: "disponibilidade",
    label: "Disponibilidade de Energia (kWh)",
    placeholder: "Ex: 150",
    keyboardType: "numeric",
    required: true,
    type: "number",
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

const initial: AssociadoFornecedorType = {
  nome: "",
  email: "",
  telefone: "",
  cnpj: "",
  dataFundacao: "",
  endereco: "",
  cidade: "",
  estado: "",
  potenciaInstalada: "",
  disponibilidade: "",
  aceitaTermos: false,
  observacoes: ""
};

export function FormFornecedor() {
  console.log("FormFornecedor rendered");
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
          title="Cadastro de Fornecedor"
          fields={fields}
          initialValues={initial}
          onSubmit={(data) => console.log("Fornecedor:", data)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
