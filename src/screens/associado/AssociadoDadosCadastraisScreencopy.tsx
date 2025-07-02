// /src/screens/associado/AssociadoDadosCadastraisScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, ScrollView, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AssociadoType } from "@/types/AssociadoType";
import { FormSection } from "@/components/forms/FormSection";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { useAppTheme } from "@/context/AppThemeContext";
import { validateFormData } from "@/utils/validates/validateFormData";
import { atualizarAssociado } from "@/services/storage/serviceAssociado";
import { isValidCPF } from "@/utils/validators/validatorCPF";
import { isValidCNPJ } from "@/utils/validators/validatorCNPJ";
import { brazilianStates } from "@/constants/states";
import { fetchPlanOptions } from "@/services/servicePlans";
import { fetchConcessionariasOptions } from "@/services/serviceConcessionarias";
import { fetchConsumoMedioOptions } from "@/services/serviceConsumoMedio";
import { ContatoRodapeCopyRight } from "@/components/ContatoRodapeCopyRight";

export default function AssociadoDadosCadastraisScreencopy() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Carrega as opções de planos, concessionárias e consumo médio
  const [planOptions, setPlanOptions] = useState<{ label: string; value: number }[]>([]);
  const [concessionariasOptions, setConcessionariasOptions] = useState<{ label: string; value: number }[]>([]);
  const [consumoMedioOptions, setConsumoMedioOptions] = useState<{ label: string; value: number }[]>([]);
  useEffect(() => {
    fetchPlanOptions().then(setPlanOptions);
    fetchConcessionariasOptions().then(setConcessionariasOptions);
    fetchConsumoMedioOptions().then(setConsumoMedioOptions);
  }, []);

  const associado: AssociadoType = {
    id: String(params.id),
    nome: String(params.nome),
    email: String(params.email),
    telefone: String(params.telefone),
    tipoPessoa: params.tipoPessoa as "Pessoa Física" | "Pessoa Jurídica",
    cpf_cnpj: String(params.cpf_cnpj),
    senha: String(params.senha),
    dataCadastro: String(params.dataCadastro),
    dataAtualizacao: String(params.dataAtualizacao),
    status: String(params.status) as "Em cadastro" | "Ativo" | "Inativo" | "Bloqueado" | "Encerrado",
    tipoAssociado: String(params.tipoAssociado) as "Fornecedor" | "Beneficiado" | "Hibrido",
    cep: String(params.cep || ""),
    endereco: String(params.endereco || ""),
    numero: String(params.numero || ""),
    bairro: String(params.bairro || ""),
    cidade: String(params.cidade || ""),
    estado: String(params.estado || ""),
    complemento: String(params.complemento || ""),
    aceitaTermos: String(params.aceitaTermos || "Não") as "Sim" | "Não",
    observacoes: String(params.observacoes || ""),
    dataNascimento: String(params.dataNascimento || ""),
    nomeSocial: String(params.nomeSocial || ""),
    dataAbertura: String(params.dataAbertura || ""),
    razaoSocial: String(params.razaoSocial || ""),
    nomeFantasia: String(params.nomeFantasia || ""),
    nomeConcessionaria: String(params.nomeConcessionaria || ""),
    consumoMedio: String(params.consumoMedio || ""),
    planoDesejado: String(params.planoDesejado || ""),
    potenciaInstalada: String(params.potenciaInstalada || ""),
    disponibilidade: String(params.disponibilidade || ""),
    tipoConexao: String(params.tipoConexao || ""),
  };

  const fields: FieldDefinitionType<AssociadoType>[] = [
    // campos não editaveis
    {
      defaultValue: associado.id,
      editable: false,
      name: "id",
      label: "ID",
      type: "text",
      placeholder: "ID do associado",
    },
    {
      defaultValue: associado.dataCadastro,
      editable: false,
      name: "dataCadastro",
      label: "Data de Cadastro",
      type: "text",
      placeholder: "Data de cadastro do associado",
      formattedValue: (value) => new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      defaultValue: associado.dataAtualizacao,
      editable: false,
      name: "dataAtualizacao",
      label: "Última Atualização",
      type: "text",
      placeholder: "Data da última atualização",
      formattedValue: (value) => new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      defaultValue: associado.status,
      editable: false,
      name: "status",
      label: "Status",
      type: "text",
      placeholder: "Status do associado",
      options: [
        { label: "Em cadastro", value: "Em cadastro" },
        { label: "Ativo", value: "Ativo" },
        { label: "Inativo", value: "Inativo" },
        { label: "Bloqueado", value: "Bloqueado" },
        { label: "Encerrado", value: "Encerrado" },
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Status é obrigatório.";
        const validStatuses = ["Em cadastro", "Ativo", "Inativo", "Bloqueado", "Encerrado"];
        if (!validStatuses.includes(value)) return "Status inválido.";
        return null;
      }
    },
    {
      defaultValue: (associado.tipoPessoa !== "Pessoa Jurídica" ? "Pessoa Física" : "Pessoa Jurídica"),
      editable: false,
      name: "tipoPessoa",
      label: "Tipo de Pessoa",
      type: "select",
      placeholder: "Tipo de Pessoa",
      options: [
        { label: "Pessoa Física", value: "Pessoa Física" },
        { label: "Pessoa Jurídica", value: "Pessoa Jurídica" },
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Tipo de pessoa é obrigatório.";
        return null;
      }
    },
    {
      defaultValue: associado.cpf_cnpj,
      editable: false,
      name: "cpf_cnpj",
      label: "CPF/CNPJ",
      placeholder: "000.000.000-00",
      type: "text",
      required: true,
      keyboardType: "numeric",
      validation: (value, allValues) => {
        if (allValues.tipoPessoa === "fisica") {
          if (!value) return "CPF é obrigatório para pessoa física";
          if (!isValidCPF(value)) return "CPF inválido";
        }
        if (allValues.tipoPessoa === "juridica") {
          if (!value) return "CNPJ é obrigatório para pessoa jurídica";
          if (!isValidCNPJ(value)) return "CNPJ inválido";
        }
        return null;
      },
    },
    {
      defaultValue: associado.tipoAssociado,
      name: "tipoAssociado",
      label: "Tipo Associado",
      type: "text",
      editable: false,
      options: [
        { label: "Fornecedor", value: "Fornecedor" },
        { label: "Beneficiado", value: "Beneficiado" },
        { label: "Hibrido", value: "Hibrido" },
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Tipo de associado é obrigatório.";
        const validTypes = ["Fornecedor", "Beneficiado", "Hibrido"];
        if (!validTypes.includes(value)) return "Tipo de associado inválido.";
        return null;
      },
      placeholder: "Selecione o tipo de associado",
    },


    // campos editaveis 
    {
      defaultValue: associado.nome,
      editable: true,
      name: "nome",
      label: "Nome completo ou Razão Social",
      placeholder: "João Silva",
      type: "text",
      required: true,
      toUpperCase: true,
    },
    {
      defaultValue: associado.telefone,
      editable: true,
      required: true,
      name: "telefone",
      label: "Telefone",
      placeholder: "(11) 99999-0000",
      type: "text",
      validation: (value) => {
        if (!value) return "Telefone é obrigatório";
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!phoneRegex.test(value)) return "Telefone inválido. Formato esperado: (XX) XXXXX-XXXX";
        return null;
      }
    },
    {
      defaultValue: associado.email,
      editable: true,
      name: "email",
      label: "E-mail",
      placeholder: "exemplo@email.com",
      type: "email",
      required: true,
      validation: (value) => {
        if (!value) return "E-mail é obrigatório";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "E-mail inválido";
        return null;
      }
    },

    // Campos de endereço
    {
      defaultValue: associado.cep,
      editable: true,
      name: "cep",
      label: "CEP",
      placeholder: "00000-000",
      type: "text",
      required: true,
      keyboardType: "numeric",
      validation: (value) => {
        if (!value) return "CEP é obrigatório";
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!cepRegex.test(value)) return "CEP inválido. Formato esperado: 00000-000";
        return null;
      }
    },
    {
      defaultValue: associado.endereco,
      editable: true,
      name: "endereco",
      label: "Endereço",
      placeholder: "Rua Exemplo, 123",
      type: "text",
      required: true,
      toUpperCase: true,
    },
    {
      defaultValue: associado.numero,
      editable: true,
      name: "numero",
      label: "Número",
      placeholder: "123",
      type: "text",
      required: true,
    },
    {
      defaultValue: associado.bairro,
      editable: true,
      name: "bairro",
      label: "Bairro",
      placeholder: "Informe o bairro",
      type: "text",
      required: true,
      toUpperCase: true,
    },
    {
      defaultValue: associado.cidade,
      editable: true,
      name: "cidade",
      label: "Cidade",
      placeholder: "Informe a cidade",
      type: "text",
      required: true,
      toUpperCase: true,
    },
    {
      defaultValue: associado.estado,
      editable: true,
      name: "estado",
      label: "Estado",
      placeholder: "SP",
      type: "select",
      required: true,
      keyboardType: "default",
      options: brazilianStates,
    },
    {
      defaultValue: associado.complemento,
      editable: true,
      name: "complemento",
      label: "Complemento (opcional)",
      placeholder: "Apto 101, Bloco B, etc.",
      type: "text",
      toUpperCase: true,
    },

    // Campos adicionais
    {
      defaultValue: associado.tipoConexao,
      editable: true,
      name: "tipoConexao",
      label: "Tipo de Conexão",
      placeholder: "Selecione o tipo",
      type: "select",
      required: true,
      options: [
        { label: "Monofásica", value: "monofasica" },
        { label: "Bifásica", value: "bifasica" },
        { label: "Trifásica", value: "trifasica" },
      ],
    },
    {
      defaultValue: associado.aceitaTermos || "Não", // Valor padrão
      editable: true,
      name: "aceitaTermos",
      label: "Aceita os termos e condições?",
      type: "select",
      placeholder: "Selecione uma opção",
      required: true,
      options: [
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
      ],
    },
    {
      defaultValue: associado.observacoes,
      editable: true,
      name: "observacoes",
      label: "Observações (opcional)",
      placeholder: "",
      type: "textarea", // Campo de texto grande
    },

    // campos específicos de pessoa física
    {
      defaultValue: associado.dataNascimento,
      editable: true,
      name: "dataNascimento",
      label: "Data de Nascimento",
      placeholder: "DD/MM/AAAA",
      type: "date",
      required: true,
      formattedValue: (value) => new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      defaultValue: associado.nomeSocial,
      editable: true,
      name: "nomeSocial",
      label: "Nome Social (opcional)",
      placeholder: "Nome social do associado",
      type: "text",
      toUpperCase: true,
    },

    // campos específicos de pessoa jurídica
    {
      defaultValue: associado.razaoSocial,
      editable: true,
      name: "razaoSocial",
      label: "Razão Social",
      placeholder: "Razão social da empresa",
      type: "text",
      toUpperCase: true,
    },
    {
      defaultValue: associado.nomeFantasia,
      editable: true,
      name: "nomeFantasia",
      label: "Nome Fantasia (opcional)",
      placeholder: "Nome fantasia da empresa",
      type: "text",
      toUpperCase: true,
    },
    {
      defaultValue: associado.dataAbertura,
      editable: true,
      name: "dataAbertura",
      label: "Data de Abertura",
      placeholder: "DD/MM/AAAA",
      type: "date",
      required: true,
      formattedValue: (value) => new Date(value).toLocaleDateString("pt-BR"),
    },

    // dados especificos de beneficiado
    {
      name: "nomeConcessionaria",
      label: "Informe a concessionaria",
      type: "select",
      required: true,
      placeholder: "Selecione a concessionária",
      options: concessionariasOptions.map(option => ({
        ...option,
        value: String(option.value),
      })),
    },
    {
      name: "consumoMedio",
      label: "Consumo médio mensal (kWh)",
      type: "select",
      required: true,
      placeholder: "Selecione o consumo médio",
      options: consumoMedioOptions.map(option => ({
        ...option,
        value: String(option.value),
      })),
    },
    {
      name: "planoDesejado",
      label: "Plano desejado",
      placeholder: "Selecione um plano",
      type: "select",
      required: true,
      options: planOptions.map(option => ({
        ...option,
        value: String(option.value),
      })),
    },

    // campos específicos de fornecedor
    {
      defaultValue: associado.potenciaInstalada,
      editable: true,
      name: "potenciaInstalada",  // Campo de potência instalada
      label: "Potência Instalada (kWh)",
      placeholder: "Potência instalada",  // Placeholder para potência instalada
      type: "text", // Tipo numérico para potência
      keyboardType: "numeric", // Teclado numérico
      required: true, // Campo obrigatório
    },
    {
      defaultValue: associado.disponibilidade,
      editable: true,
      name: "disponibilidade",
      label: "Disponibilidade de Energia (kWh)",
      placeholder: "Ex: 150",
      keyboardType: "numeric",
      required: true,
      type: "number",
    },
  ];

  const handleSubmit = async (data: AssociadoType) => {
    console.log("AssociadoDadosCadastrais  -handleSubmit - Iniciando ... :", data);
    const erros = validateFormData(data, fields);
    if (Object.keys(erros).length > 0) {
      console.log("AssociadoDadosCadastrais  - handleSubmit - erros:", data);
      setMensagem("Por favor, corrija os erros antes de salvar." + JSON.stringify(erros));
      return;
    }

    console.log("AssociadoDadosCadastrais  - handleSubmit - Preparando dados para atualizar:", data);
    const dadosAtualizados = {
      ...associado,
      ...data,
      senha: associado.senha, // mantém senha original
    };
    console.log("AssociadoDadosCadastraisScreen - Dados prontos para atualizar:", dadosAtualizados);

    try {
      console.log("AssociadoDadosCadastraisScreen - Enviando dados para a API de atualizacao ...", dadosAtualizados);
      await atualizarAssociado(dadosAtualizados);
      console.log("AssociadoDadosCadastraisScreen - Dados atualizados com sucesso.", dadosAtualizados);
    } catch (error) {
      console.error(error);
      console.log("AssociadoDadosCadastraisScreen - Erro ao atualizar os dados.", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // ou ajustar conforme cabeçalho
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
            {/* <View style={theme.container}> */}
            <Text style={[theme.title, { marginBottom: 16 }]}>
              Dados Cadastrais do Associado !!!!
            </Text>

            {mensagem && (
              <Text style={[theme.text, { marginBottom: 12, color: "blue" }]}>{mensagem}</Text>
            )}

            <FormSection
              fields={fields}
              title=""
              initialValues={associado}
              onSubmit={handleSubmit}
              isSubmit={true}
            />
          </View>
        </ScrollView>
        <ContatoRodapeCopyRight />
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
}
