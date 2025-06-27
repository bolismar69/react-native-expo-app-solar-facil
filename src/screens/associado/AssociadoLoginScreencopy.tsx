import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/context/AppThemeContext";
import { InputPasswordWithToggle } from "@/components/inputs/InputPasswordWithToggle";
import { buscarAssociadoPorCpfCnpjSenha } from "@/services/storage/serviceAssociado";

export default function AssociadoLoginScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const [cpfCnpj, setCpfCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!cpfCnpj || !senha) {
      Alert.alert("Atenção", "Por favor, preencha CPF/CNPJ e a senha.");
      return;
    }

    setLoading(true);
    try {
      const resultado = await buscarAssociadoPorCpfCnpjSenha(cpfCnpj, senha);
      if (resultado.length === 0) {
        Alert.alert("Erro", "CPF/CNPJ ou senha inválidos.");
        setLoading(false);
        return;
      }

      const associado = resultado[0];
      router.push({
        pathname: "/associado/dadoscadastrais",
        params: { ...associado },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Erro ao realizar login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={theme.container}>
      <Text style={[theme.subtitle, { marginBottom: 16 }]}>
        Informe seu CPF ou CNPJ para entrar
      </Text>

      <TextInput
        placeholder="CPF ou CNPJ"
        style={[theme.input, { marginBottom: 16 }]}
        value={cpfCnpj}
        onChangeText={setCpfCnpj}
        keyboardType="default"
        autoCapitalize="none"
      />

      <InputPasswordWithToggle
        label="Senha"
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={[theme.button, { padding: 16, marginTop: 16 }]}
        disabled={loading}
      >
        <Text style={theme.buttonText}>
          {loading ? "Entrando..." : "ENTRAR"}
        </Text>
      </TouchableOpacity>

      <Text style={[theme.text, { marginVertical: 32 }]}>ou</Text>

      <TouchableOpacity
        onPress={() => router.push("/associado/cadastro")}
        style={[theme.button, { padding: 16 }]}
      >
        <Text style={theme.buttonText}>
          Cadastre-se e venha fazer parte da nossa comunidade!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
