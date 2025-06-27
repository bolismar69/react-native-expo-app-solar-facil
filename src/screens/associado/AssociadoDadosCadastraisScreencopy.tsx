// src/screens/associado/AssociadoDadosCadastraisScreen.tsx
import React from "react";
import { Text, View, ScrollView, SafeAreaView, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AssociadoType } from "@/types/AssociadoType";
import { useAppTheme } from "@/context/AppThemeContext";

export default function AssociadoDadosCadastraisScreencopy() {
  const { theme } = useAppTheme();
  const params = useLocalSearchParams<AssociadoType>();
  const associado = params as AssociadoType;

  const isPessoaFisica = associado?.tipoPessoa === "Pessoa Física";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.screen.backgroundColor }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>

        {/* Header */}
        <View style={{ marginBottom: 16 }}>
          <Text style={theme.title}>Dados Cadastrais</Text>
        </View>

        {/* ID E DATA DE CADASTRO */}
        <View style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}>

          {/* ID */}
          <View style={{ flex: 1, marginRight: 8, }}>
            <Text style={theme.label}>ID</Text>
            <TextInput
              value={associado?.id.toString()}
              editable={false}
              style={theme.inputText}
            />
          </View>
          {/* Data de dataCadastro no formato brasileiro */}
          <View style={{ flex: 1 }}>
            <Text style={theme.label}>Data de Cadastro</Text>
            <TextInput
              value={associado?.dataCadastro ? new Date(associado.dataCadastro).toLocaleDateString("pt-BR") : ""}
              editable={false}
              style={theme.inputText}
            />
          </View>
        </View>

        {/* Tipo do Associado e Status */}
        <View style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}>

          {/* Tipo do Associado */}
          <View style={{ flex: 1, marginRight: 8, }}>
            <Text style={theme.label}>Tipo de Associado</Text>
            <TextInput
              value={associado?.tipoAssociado}
              editable={false}
              style={theme.inputText}
            />
          </View>

          {/* Status */}
          <View style={{ flex: 1 }}>
            <Text style={theme.label}>Status</Text>
            <TextInput
              value={associado?.status}
              editable={false}
              style={theme.inputText}
            />
          </View>
        </View>


        {/* Tipo de pessoa + CPF/CNPJ */}
        <View style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}>

          {/* Tipo de Pessoa */}
          <View style={{ flex: 1, marginRight: 8, }}>
            <Text style={theme.label}>Tipo de Pessoa</Text>
            <TextInput
              value={isPessoaFisica ? "Pessoa Física" : "Pessoa Jurídica"}
              editable={false}
              style={theme.inputText}
            />
          </View>

          {/* CPF/CNPJ */}
          <View style={{ flex: 1 }}>
            <Text style={theme.label}>{isPessoaFisica ? "CPF" : "CNPJ"}</Text>
            <TextInput
              value={isPessoaFisica ? associado?.cpf_cnpj : associado?.cpf_cnpj}
              editable={false}
              style={theme.inputText}
            />
          </View>
        </View>

        {/* Nome */}
        <View style={{ flex: 1 }}>
          <Text style={theme.label}>Nome completo / Razão Social</Text>
          <TextInput
            value={associado?.nome}
            editable={false}
            style={theme.inputText}
          />
        </View>

        {/* Telefone */}
        <View style={{ flex: 1 }}>
          <Text style={theme.label}>Telefone</Text>
          <TextInput
            value={associado?.telefone}
            editable={false}
            style={theme.inputText}
          />
        </View>

        {/* E-mail */}
        <View style={{ flex: 1 }}>
          <Text style={theme.label}>E-mail</Text>
          <TextInput
            value={associado?.email}
            editable={false}
            style={theme.inputText}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}
