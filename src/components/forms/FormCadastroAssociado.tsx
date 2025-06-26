import React, { useState } from "react";
import { FormSection } from "@/components/forms/FormSection";
import { AssociadoType } from "@/types/AssociadoType";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { salvarAssociado } from "@/services/storage/serviceAssociado";
import { isValidCPF } from "@/utils/validators/validatorCPF";
import { isValidCNPJ } from "@/utils/validators/validatorCNPJ";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function FormCadastroAssociado() {
  const router = useRouter();

  const [mensagem, setMensagem] = useState<{
    tipo: "success" | "error";
    texto: string;
  } | null>(null);

  const [formVisivel, setFormVisivel] = useState(true);

  const [dadosAssociado, setDadosAssociado] = useState<AssociadoType | null>(null);

  const fields: FieldDefinitionType<AssociadoType>[] = [
    {
      name: "nome",
      label: "Nome completo ou Razão Social",
      placeholder: "João Silva",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "E-mail",
      placeholder: "exemplo@email.com",
      type: "email",
      required: true,
    },
    {
      name: "telefone",
      label: "Telefone",
      placeholder: "(11) 99999-0000",
      type: "text",
      required: true,
    },
    {
      name: "tipoPessoa",
      label: "Tipo de Pessoa",
      placeholder: "Selecione",
      type: "select",
      required: true,
      options: [
        { value: "fisica", label: "Pessoa Física" },
        { value: "juridica", label: "Pessoa Jurídica" },
      ],
    },
    {
      name: "cpf",
      label: "CPF (se pessoa física)",
      placeholder: "000.000.000-00",
      type: "text",
      required: false,
      keyboardType: "numeric",
      validation: (value, allValues) => {
        if (allValues.tipoPessoa === "fisica") {
          if (!value) return "CPF é obrigatório para pessoa física";
          if (!isValidCPF(value)) return "CPF inválido";
        }
        return null;
      },
    },
    {
      name: "cnpj",
      label: "CNPJ (se pessoa jurídica)",
      placeholder: "00.000.000/0001-00",
      type: "text",
      required: false,
      keyboardType: "numeric",
      validation: (value, allValues) => {
        if (allValues.tipoPessoa === "juridica") {
          if (!value) return "CNPJ é obrigatório para pessoa jurídica";
          if (!isValidCNPJ(value)) return "CNPJ inválido";
        }
        return null;
      },
    },
  ];

  const initialValues: AssociadoType = {
    nome: "",
    email: "",
    telefone: "",
    tipoPessoa: "fisica",
    cpf: "",
    cnpj: "",
  };

  const handleSubmit = async (data: AssociadoType) => {
    try {
      await salvarAssociado(data);
      setDadosAssociado(data); // <== salva para usar na navegação
      setMensagem({
        tipo: "success",
        texto: "Parabéns, cadastro realizado com sucesso!",
      });
      setFormVisivel(false);
    } catch (error: any) {
      setMensagem({
        tipo: "error",
        texto: error?.message || "Erro ao salvar o associado.",
      });
      setFormVisivel(false);
    }
  };

  const handleMensagemPress = () => {
    setMensagem(null);
    setFormVisivel(true);

    if (mensagem?.tipo === "success" && dadosAssociado) {
      router.push({
        pathname: "/associado/dadoscadastrais",
        params: { ...dadosAssociado },
      });
    }
  };

  return (
    <View style={{ gap: 24 }}>
      {mensagem && (
        <TouchableOpacity
          onPress={handleMensagemPress}
          style={{
            backgroundColor: mensagem.tipo === "success" ? "#DBEAFE" : "#FECACA",
            padding: 16,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Ionicons
            name={mensagem.tipo === "success" ? "checkmark-circle" : "alert-circle"}
            size={24}
            color={mensagem.tipo === "success" ? "#2563EB" : "#DC2626"}
          />
          <Text
            style={{
              color: mensagem.tipo === "success" ? "#2563EB" : "#DC2626",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {mensagem.texto}
          </Text>
        </TouchableOpacity>
      )}

      {formVisivel && (
        <FormSection
          title="Cadastro de Associado"
          fields={fields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      )}
    </View>
  );
}
