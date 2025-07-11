import React from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Platform } from "react-native";
import { useAppTheme } from "@/context/AppThemeContext";
import { FormDadosCadastraisAssociado } from "@/components/forms/FormDadosCadastraisAssociado";
import { ContatoRodapeCopyRight } from "@/components/ContatoRodapeCopyRight";
import { useAuth } from "@/context/AuthContext";
import { FormCadastroAssociado } from "@/components/forms/FormCadastroAssociado";

export default function AssociadoDadosCadastraisScreen() {
  console.log("AssociadoDadosCadastraisScreen - Renderizando tela de dados cadastrais do associado");
  const { theme } = useAppTheme();
  const { isLoggedIn, userID, userName, associado } = useAuth();
  console.log("AssociadoDadosCadastraisScreen - isLoggedIn:", isLoggedIn);
  console.log("AssociadoDadosCadastraisScreen - userID:", userID);
  console.log("AssociadoDadosCadastraisScreen - userName:", userName);
  console.log("AssociadoDadosCadastraisScreen - associado:", associado);

  const handleSubmit = (data: any) => {
    console.log("AssociadoDadosCadastraisScreen - Associado cadastrado com sucesso:", data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            flexGrow: 1,
            backgroundColor: theme.screen?.backgroundColor,
          }}
          keyboardShouldPersistTaps="handled"
        >

          {isLoggedIn === true && associado
            ? (
              console.log("AssociadoDadosCadastraisScreen - Renderizando FormDadosCadastraisAssociado"),
              <FormDadosCadastraisAssociado
                associado={associado}
                onSubmit={handleSubmit}
              />
            ) : (
              console.log("AssociadoDadosCadastraisScreen - Renderizando FormCadastroAssociado"),
              <FormCadastroAssociado onSubmit={handleSubmit} />
            )}


        </ScrollView>
        <ContatoRodapeCopyRight />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
