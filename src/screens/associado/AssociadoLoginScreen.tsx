import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppTheme } from "@/context/AppThemeContext";
import { buscarAssociadoPorCpfCnpjSenha } from "@/services/storage/serviceAssociado";
import { AssociadoType } from "@/types/AssociadoType";
import { Ionicons } from "@expo/vector-icons";

export default function AssociadoLoginScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMensagemErro(null);
    setLoading(true);

    try {
      const resultado: AssociadoType[] = await buscarAssociadoPorCpfCnpjSenha(identificador, senha);

      if (resultado.length > 0) {
        const associado = resultado[0];
        router.push({
          pathname: "/associado/dadoscadastrais",
          params: associado,
        });
      } else {
        setMensagemErro("CPF/CNPJ ou senha inválidos.");
      }
    } catch (error: any) {
      setMensagemErro("Erro ao tentar login. Tente novamente.");
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={theme.container}>
      <Text style={[theme.subtitle, { marginBottom: 16 }]}>
        Informe seu CPF ou CNPJ para entrar
      </Text>

      <View style={[{ flexDirection: "row", alignItems: "center", marginBottom: 12, marginLeft: 32, marginRight: 32 }]}>
        <TextInput
          placeholder="CPF ou CNPJ, cadastrado"
          style={[theme.input, { flex: 1 }]}
          value={identificador}
          onChangeText={setIdentificador}
        // autoCapitalize="none"
        />
      </View>

      {/* Campo de senha com botão de ver/ocultar */}
      <View style={[{ flexDirection: "row", alignItems: "center", marginBottom: 12, marginLeft: 32, marginRight: 32 }]}>
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!mostrarSenha}
          style={[theme.input, { flex: 1 }]}
          placeholderTextColor={theme.placeholder.color}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons
            name={mostrarSenha ? "eye" : "eye-off"}
            size={24}
            color={theme.placeholder.color}
          />
        </TouchableOpacity>
      </View>

      {mensagemErro && (
        <Text style={{ color: "red", marginBottom: 12, textAlign: "center" }}>
          {mensagemErro}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={[theme.button, { padding: 16 }]}
      >
        <Text style={[theme.buttonText, { fontWeight: "600", textAlign: "center" }]}>
          {loading ? "Validando..." : "ENTRAR"}
        </Text>
      </TouchableOpacity>

      <Text style={[theme.text, { marginTop: 32, marginBottom: 16 }]}>ou</Text>

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
