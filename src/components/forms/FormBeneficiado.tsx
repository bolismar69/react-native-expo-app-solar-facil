// src/components/forms/FormBeneficiado.tsx
// import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { FormSection } from "@/components/forms/FormSection";
import { BeneficiadoType } from "@/types/BeneficiadoType";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
// import { useAppTheme } from "@/context/AppThemeContext";
import { validateFormData } from "@/utils/validateFormData";
import { isValidCPF, formatCPF } from "@/utils/validatorCPF";
import { brazilianStates } from "@/constants/states";

interface Props {
  onSubmit?: (data: BeneficiadoType) => void;
}

export function FormBeneficiado({ onSubmit }: Props) {
  console.log("FormBeneficiado rendered");

  const fields: FieldDefinitionType<BeneficiadoType>[] = [
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
      errorMessage: "Formato esperado: 000.000.000-00",
      formattedValue: formatCPF,
      toUpperCase: true,
    },
    {
      name: "documentoIdentidade",
      label: "Documento de Identidade (RG)",
      type: "text",
      placeholder: "12345678-9",
      required: false,
      keyboardType: "default",
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
      validation: (value: string) =>
        value?.length >= 10 ? null : "Telefone inválido",
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
      name: "nomeConcessionaria",
      label: "Informe a concessionaria",
      type: "select",
      required: true,
      placeholder: "Selecione a concessionária",
      options: [
        { label: "Enel Distribuição São Paulo", value: "ENEL" },
        { label: "CPFL Paulista", value: "CPFLPaulista" },
        { label: "CPFL Piratininga", value: "CPFLPiratininga" },
        { label: "CPFL Santa Cruz", value: "CPFLSantaCruz" },
        { label: "EDP SP", value: "EDPSP" },
        { label: "Energisa Sul Sudeste", value: "EnergisaSulSudeste" },
        { label: "Neoenergia Elektro", value: "NeoenergiaElektro" },
      ]
    },
    {
      name: "consumoMedio",
      label: "Consumo médio mensal (kWh)",
      type: "select",
      required: true,
      placeholder: "Selecione o consumo médio",
      options: [
        { label: "Até R$ 500,00", value: "0-500" },
        { label: "De R$ 500,01 até R$ 1.000,00", value: "501-1000" },
        { label: "De R$ 1.000,01 até R$ 2.000,00", value: "1001-2000" },
        { label: "De R$ 2.000,01 até R$ 3.000,00", value: "2001-3000" },
        { label: "De R$ 3.000,01 até R$ 4.000,00", value: "3001-4000" },
        { label: "Acima de R$ 4.000,00", value: "4000-9999999999" },
      ]
    },
    {
      name: "planoDesejado",
      label: "Plano desejado",
      placeholder: "Basic / Special / Premium",
      type: "select",
      required: true,
      keyboardType: "default",
      options: [
        { label: "Basic", value: "basic" },
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

  const initialValues: BeneficiadoType = {
    nome: "",
    cpf: "",
    documentoIdentidade: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    consumoMedio: "",
    planoDesejado: "",
    aceitaTermos: false,
    observacoes: "",
    nomeConcessionaria: "",
  };

  // return (
  //   <KeyboardAvoidingView
  //     style={{ flex: 1 }}
  //     behavior={Platform.OS === "ios" ? "padding" : "height"}
  //   >
  //     <ScrollView
  //       style={[{ padding: 16, backgroundColor: theme.screen.backgroundColor }]}
  //       contentContainerStyle={{ paddingBottom: 40 }}
  //       keyboardShouldPersistTaps="handled"
  //     >
  //       <FormSection
  //         title="Cadastro de Beneficiado"
  //         fields={fields}
  //         initialValues={initial}
  //         onSubmit={(data) => console.log("Beneficiado:", data)}
  //       />
  //     </ScrollView>
  //   </KeyboardAvoidingView>
  // );
  return (
    <FormSection
      title="Cadastro de Beneficiado"
      fields={fields}
      initialValues={initialValues}
      onSubmit={(data) => {
        const errors = validateFormData(data, fields);
        if (Object.keys(errors).length > 0) {
          console.warn("Erros de validação:", errors);
          return;
        }
        onSubmit?.(data);
      }}
    />
  );
}
