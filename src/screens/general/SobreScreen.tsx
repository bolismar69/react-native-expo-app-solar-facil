import { useAppTheme } from "@/context/AppThemeContext";
import { Image, KeyboardAvoidingView, Linking, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CardIconeAmarelo from "@/components/CardIconeAmarelo";
import CardIconePadrao from "@/components/CardIconePadrao";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function SobreScreen() {
  const { theme } = useAppTheme();
  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir URL:", err));
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
          style={{ flex: 1, backgroundColor: theme.basicView.backgroundColor }}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        >

          {/* Título */}
          <Text style={theme.title}>Sobre a Solar Fácil</Text>

          {/* Imagem institucional */}
          <Image
            source={require("@/assets/solar-facil-institucional.png")}
            style={theme.imagePreview}
          />

          {/* Apresentação institucional */}
          <Text style={theme.text}>
            A Solar Fácil é uma cooperativa moderna que conecta Produtores de Energia Solar aos Beneficiados — pessoas físicas ou jurídicas que desejam economizar na conta de luz.
          </Text>
          <Text style={theme.text}>
            Os produtores injetam energia excedente na rede da Distribuidora local, e a Solar Fácil distribui esse crédito entre os cooperados de forma transparente, segura e sustentável.
          </Text>
          <Text style={theme.text}>
            Nosso modelo é descentralizado, colaborativo e regulado pela ANEEL. Geramos impacto ambiental positivo, economia para os beneficiados e retorno para os fornecedores.
          </Text>

          {/* Nossos Valores */}
          <Text style={theme.subtitle}>Nossos Valores</Text>

          {/* Cards com ícones e destaques */}
          <CardIconeAmarelo
            iconName="people-circle-outline"
            iconColor="green"
            iconBackground="yellow"
            title="Cooperação"
            description="Valorizamos a colaboração entre os membros para construir um futuro energético melhor."
            theme={theme}
          />
          <CardIconeAmarelo
            iconName="shield-checkmark-outline"
            iconColor="green"
            iconBackground="yellow"
            title="Transparência"
            description="Todas as operações são claras, com rastreabilidade dos créditos e repasses."
            theme={theme}
          />
          <CardIconeAmarelo
            iconName="sunny-outline"
            iconColor="green"
            iconBackground="yellow"
            title="Sustentabilidade"
            description="Reduzimos a pegada de carbono ao promover o uso de energia limpa e renovável."
            theme={theme}
          />

          {/* Nossa História */}
          <Text style={theme.subtitle}>Nossa História</Text>

          <CardIconePadrao
            iconName="calendar-start"
            iconColor={theme.title.color}
            iconBackground=""
            title="2022 — Ideia e Pesquisa"
            description="Estudo sobre modelos de cooperativas energéticas e viabilidade técnica no Brasil."
            theme={theme}
          />

          <CardIconePadrao
            iconName="lightbulb-on-outline"
            iconColor={theme.title.color}
            iconBackground=""
            title="2023 — Criação da Solar Fácil"
            description="Lançamento da cooperativa com foco em energia solar compartilhada."
            theme={theme}
          />

          <CardIconePadrao
            iconName="account-group-outline"
            iconColor={theme.title.color}
            iconBackground=""
            title="2024 — Primeiros Cooperados"
            description="Início da operação com os primeiros produtores e beneficiados em São Paulo."
            theme={theme}
          />

          <CardIconePadrao
            iconName="rocket-launch"
            iconColor={theme.title.color}
            iconBackground=""
            title="2025 — Expansão Nacional"
            description="Expansão da atuação para outros estados, integrando mais redes e cooperados."
            theme={theme}
          />

          {/* Contato */}
          <Text style={theme.subtitle}>Quer fazer parte?</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 8 }}>
            <TouchableOpacity onPress={() => handlePress("mailto:contato@solarfacil.com")}>
              <Ionicons name="mail" size={32} color={theme.title.color} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("https://wa.me/5511956781234?text=Olá%2C%20estou%20interessado%20em%20saber%20mais%20sobre%20o%20Solar%20Fácil.%20Me%20passe%20por%20aqui%20o%20link%20para%20ser%20adicionado.")}>
              <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("https://www.instagram.com/instagram")}>
              <Ionicons name="logo-instagram" size={32} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("https://www.facebook.com/AdoroCinema")}>
              <Ionicons name="logo-facebook" size={32} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("https://www.youtube.com/")}>
              <FontAwesome name="youtube" size={32} color="#FF0000" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
