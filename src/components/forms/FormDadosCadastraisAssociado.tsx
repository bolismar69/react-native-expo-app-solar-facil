import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FormSection } from "@/components/forms/FormSection";
import { AssociadoType } from "@/types/AssociadoType";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { validateFormData } from "@/utils/validates/validateFormData";
import { atualizarAssociado } from "@/services/storage/serviceAssociado";
import { fetchPlanOptions } from "@/services/servicePlans";
import { fetchConcessionariasOptions } from "@/services/serviceConcessionarias";
import { fetchConsumoMedioOptions } from "@/services/serviceConsumoMedio";
import { isValidCPF } from "@/utils/validators/validatorCPF";
import { isValidCNPJ } from "@/utils/validators/validatorCNPJ";
import { brazilianStates } from "@/constants/states";

interface FormCadastroDadosCadastraisAssociadoProps {
  associado: AssociadoType;
  onSubmit?: (data: AssociadoType) => void;
}

export const FormDadosCadastraisAssociado: React.FC<FormCadastroDadosCadastraisAssociadoProps> = ({
  associado,
  onSubmit,
}) => {
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
    console.log("FormCadastroDadosCadastraisAssociado - handleSubmit - Iniciando ... :", data);
    const erros = validateFormData(data, fields);
    if (Object.keys(erros).length > 0) {
      console.log("FormCadastroDadosCadastraisAssociado - handleSubmit - erros:", erros);
      setMensagem("Por favor, corrija os erros antes de salvar.");
      return;
    }

    const dadosAtualizados = {
      ...associado,
      ...data,
      senha: associado.senha, // mantém senha original
    };

    try {
      await atualizarAssociado(dadosAtualizados);
      console.log("FormCadastroDadosCadastraisAssociado - Dados atualizados com sucesso.", dadosAtualizados);
      setMensagem("Dados atualizados com sucesso!");
      if (onSubmit) onSubmit(dadosAtualizados);
    } catch (error) {
      console.error("FormCadastroDadosCadastraisAssociado - Erro ao atualizar os dados.", error);
      setMensagem("Erro ao atualizar os dados.");
    }
  };

  return (
    <View style={{ gap: 24 }}>
      {mensagem && <Text style={{ color: "blue", marginBottom: 12 }}>{mensagem}</Text>}
      <FormSection
        fields={fields}
        title="Dados Cadastrais do Associado"
        initialValues={associado}
        onSubmit={handleSubmit}
        isSubmit={true}
      />
    </View>
  );
};
