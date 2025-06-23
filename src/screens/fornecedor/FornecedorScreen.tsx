import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useAppTheme } from "@/context/AppThemeContext";
import { FormFornecedor } from "@/components/forms/FormFornecedor";

export default function FornecedorScreen() {
  console.log("FornecedorScreen rendered");
  const { theme } = useAppTheme();

  const handleSubmit = (data: any) => {
    console.log("Fornecedor cadastrado com sucesso:", data);
    // Aqui você pode adicionar a lógica para enviar os dados do fornecedor
    // por exemplo, uma chamada de API para salvar os dados no servidor.
    // Após o envio, você pode navegar para outra tela ou mostrar uma mensagem de sucesso.
    // Exemplo:
    // api.post('/fornecedores', data)
    //   .then(response => {
    //     console.log('Fornecedor cadastrado:', response.data);
    //     // Navegar ou mostrar mensagem de sucesso
    //   })
    //   .catch(error => {
    //     console.error('Erro ao cadastrar fornecedor:', error);
    //     // Mostrar mensagem de erro
    //   });
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
            <FormFornecedor onSubmit={handleSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
