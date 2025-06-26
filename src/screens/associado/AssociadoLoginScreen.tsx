import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppTheme } from "@/context/AppThemeContext";

export default function AssociadoLoginScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [identificador, setIdentificador] = useState("");

  const handleLogin = () => {
    console.log("Login com:", identificador);
    // Aqui poderá ser feita a verificação real futuramente
  };

  return (
    <View style={theme.container}>
      <Text style={[theme.title]}>Login do Associado</Text>
      <TextInput
        placeholder="Email, telefone, CPF ou CNPJ"
        style={[theme.input, { marginBottom: 16 }]}
        value={identificador}
        onChangeText={setIdentificador}
      />
      {/* <Button title="Entrar" onPress={handleLogin} /> */}
      <TouchableOpacity
        onPress={handleLogin}
        style={[theme.button, { padding: 16 }]}
      >
        <Text style={[theme.buttonText, { fontWeight: "600", textAlign: "center" }]}>
          ENTRAR
        </Text>
      </TouchableOpacity>

      <Text style={[theme.text, , { marginBottom: 16 }]}>ou</Text>

      {/* <Button
        title="Fazer Cadastro"
        onPress={() => router.push("/associado/cadastro")}
      /> */}

      <TouchableOpacity
        onPress={() => router.push("/associado/cadastro")}
        style={[theme.button, { padding: 16 }]}
      >
        <Text style={[theme.buttonText, { fontWeight: "600", textAlign: "center" }]}>
          Cadastre-se e venha fazer parte da nossa comunidade!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
