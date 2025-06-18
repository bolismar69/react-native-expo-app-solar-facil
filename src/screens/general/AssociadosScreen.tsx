import { useAppTheme } from "@/context/AppThemeContext";
import { AssociadoRouteType } from "@/types/AssociadoType";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useWindowDimensions, Text, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useState } from "react";
import { FormBeneficiado } from "@/components/forms/FormBeneficiado";
import { FormFornecedor } from "@/components/forms/FormFornecedor";

export default function AssociadosScreen() {
  const layout = useWindowDimensions();
  const { theme } = useAppTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState<AssociadoRouteType[]>([
    { key: "beneficiado", title: "Beneficiado" },
    { key: "fornecedor", title: "Fornecedor" },
  ]);

  const renderScene = SceneMap({
    beneficiado: FormBeneficiado,
    fornecedor: FormFornecedor,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }: { route: AssociadoRouteType; focused: boolean }) => (
        <Text
          style={{
            color: focused ? theme.tab.activeColor : theme.tab.inactiveColor,
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {route.title}
        </Text>
      )}
      indicatorStyle={{
        backgroundColor: theme.tab.indicatorColor,
        height: 3,
      }}
      style={{ backgroundColor: theme.tab.backgroundColor }}
    />
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, theme.screen]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
