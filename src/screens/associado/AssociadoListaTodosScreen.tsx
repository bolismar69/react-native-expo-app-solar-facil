// src/screens/associado/AssociadoListaTodosScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useAppTheme } from "@/context/AppThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { AssociadoType } from "@/types/AssociadoType";
import { listarAssociados, excluirAssociado } from "@/services/storage/serviceAssociado";
import { listarBeneficiados, excluirBeneficiado } from "@/services/storage/serviceBeneficiado";
import { listarFornecedores, excluirFornecedor } from "@/services/storage/serviceFornecedor";
import { useRouter } from "expo-router";

type Categoria = "Associado" | "Beneficiado" | "Fornecedor";

interface ItemProps {
  item: any;
  categoria: Categoria;
  onEditar: () => void;
  onExcluir: () => void;
  onDetalhes: () => void;
}

const ItemComAcoes = ({ item, categoria, onEditar, onExcluir, onDetalhes }: ItemProps) => {
  const { theme } = useAppTheme();

  return (
    <View style={[theme.card, { marginBottom: 12 }]}>
      <Text style={[theme.subtitle]}>
        [{categoria}] {item.nome}
      </Text>
      <Text style={theme.text}>Email: {item.email}</Text>
      <Text style={theme.text}>Telefone: {item.telefone}</Text>
      <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
        <TouchableOpacity onPress={onEditar}>
          <Ionicons name="create-outline" size={20} color="#2563EB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onExcluir}>
          <Ionicons name="trash-outline" size={20} color="#DC2626" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDetalhes}>
          <Ionicons name="arrow-forward-circle-outline" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AssociadoListaTodosScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const [associados, setAssociados] = useState<AssociadoType[]>([]);
  const [beneficiados, setBeneficiados] = useState<any[]>([]);
  const [fornecedores, setFornecedores] = useState<any[]>([]);

  const carregarDados = async () => {
    setAssociados(await listarAssociados());
    setBeneficiados(await listarBeneficiados());
    setFornecedores(await listarFornecedores());
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const confirmarRemocao = (
    categoria: Categoria,
    item: any,
    remover: () => Promise<void>
  ) => {
    Alert.alert(
      `Excluir ${categoria}`,
      `Deseja realmente excluir ${item.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await remover();
            carregarDados();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[{ padding: 16, backgroundColor: theme.screen.backgroundColor }]}>
      <Text style={theme.title}>Todos os Cadastrados</Text>

      {[...associados.map((item) => (
        <ItemComAcoes
          key={`assoc-${item.cpf}`}
          item={item}
          categoria="Associado"
          onEditar={() => console.log("Editar associado")}
          onExcluir={() =>
            confirmarRemocao("Associado", item, () => excluirAssociado(item))
          }
          onDetalhes={() =>
            router.push({
              pathname: "/associado/dadoscadastrais",
              params: { ...item },
            })
          }
        />
      ))]}

      {[...beneficiados.map((item, index) => (
        <ItemComAcoes
          key={item.cpf}
          item={item}
          categoria="Beneficiado"
          onEditar={() => console.log("Editar beneficiado")}
          onExcluir={() =>
            confirmarRemocao("Beneficiado", item, () => excluirBeneficiado(item.cpf))
          }
          onDetalhes={() => console.log("Detalhes beneficiado")}
        />
      ))]}

      {[...fornecedores.map((item, index) => (
        <ItemComAcoes
          key={item.cnpj}
          item={item}
          categoria="Fornecedor"
          onEditar={() => console.log("Editar fornecedor")}
          onExcluir={() =>
            confirmarRemocao("Fornecedor", item, () => excluirFornecedor(item.cnpj))
          }
          onDetalhes={() => console.log("Detalhes fornecedor")}
        />
      ))]}
    </ScrollView>
  );
}
