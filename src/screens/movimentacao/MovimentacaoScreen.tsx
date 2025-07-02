import { useAppTheme } from "@/context/AppThemeContext";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text } from "react-native";
import { ContatoRodapeCopyRight } from "@/components/ContatoRodapeCopyRight";

export default function MovimentacaoScreen() {
  const { theme } = useAppTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // ou ajustar conforme cabeçalho
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={[{ flex: 1 }]}>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.basicView.backgroundColor }}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        >


        </ScrollView>
        <ContatoRodapeCopyRight />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
