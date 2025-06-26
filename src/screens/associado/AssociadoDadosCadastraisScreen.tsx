// src/screens/associado/AssociadoDadosCadastraisScreen.tsx
import React from "react";
import { Text, View, ScrollView, SafeAreaView, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AssociadoType } from "@/types/AssociadoType";
import { useAppTheme } from "@/context/AppThemeContext";

export default function AssociadoDadosCadastraisScreen() {
  const { theme } = useAppTheme();
  const params = useLocalSearchParams<AssociadoType>();
  const associado = params as AssociadoType;

  const isPessoaFisica = associado?.tipoPessoa === "fisica";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.screen.backgroundColor }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Tipo de pessoa + CPF/CNPJ */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={theme.label}>Tipo de Pessoa</Text>
            <TextInput
              value={isPessoaFisica ? "Pessoa Física" : "Pessoa Jurídica"}
              editable={false}
              style={theme.inputText}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={theme.label}>{isPessoaFisica ? "CPF" : "CNPJ"}</Text>
            <TextInput
              value={isPessoaFisica ? associado?.cpf : associado?.cnpj}
              editable={false}
              style={theme.inputText}
            />
          </View>
        </View>

        {/* Nome */}
        <View>
          <Text style={theme.label}>Nome completo / Razão Social</Text>
          <TextInput
            value={associado?.nome}
            editable={false}
            style={theme.inputText}
          />
        </View>

        {/* Telefone */}
        <View>
          <Text style={theme.label}>Telefone</Text>
          <TextInput
            value={associado?.telefone}
            editable={false}
            style={theme.inputText}
          />
        </View>

        {/* E-mail */}
        <View>
          <Text style={theme.label}>E-mail</Text>
          <TextInput
            value={associado?.email}
            editable={false}
            style={theme.inputText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
