import { Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons, FontAwesome, MaterialCommunityIcons, } from "@expo/vector-icons";
import { AppThemeProvider } from "@/context/AppThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
// import SolEnergiaIcon from "@/assets/icones/sol_energia.png";
// import { TabIcon } from "@/components/ui/TabIcon";
// import { FaHouseDamage } from "react-icons/fa";
// import { LiaHouseDamageSolid } from "react-icons/lia";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RootLayout() {
  console.log("RootLayout");

  // const iconFocusedColor = "#2E7D32"; // Verde para o ícone focado
  // const iconFocusedColor = "#388E3C"; // Verde para o ícone focado
  const iconFocusedColor = "#43A047"; // Verde para o ícone focado
  // const iconFocusedColor = "#04f611"; // Verde para o ícone focado

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppThemeProvider>
        <React.Fragment>
          <StatusBar style="auto" />
          <Tabs
            screenOptions={{
              tabBarInactiveTintColor: "#888", // Cor padrão para ícones não focados
              tabBarActiveTintColor: iconFocusedColor, // Cor para ícones focados
              tabBarActiveBackgroundColor: "#f0f0f0", // Cor de fundo para ícones focados
              tabBarInactiveBackgroundColor: "#fff", // Cor de fundo para ícones não focados
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size, focused, }) => (
                  <Ionicons name="home"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="beneficiado"
              options={{
                title: "Beneficiado",
                headerShown: false,
                tabBarLabel: "+",
                tabBarIcon: ({ color, size, focused, }) => (
                  <FontAwesome name="handshake-o"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="fornecedor"
              options={{
                title: "Fornecedor",
                headerShown: false,
                tabBarLabel: "+",
                tabBarIcon: ({ color, size, focused, }) => (
                  <MaterialCommunityIcons
                    name="home-lightning-bolt-outline"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="planos"
              options={{
                title: "Planos",
                headerShown: false,
                tabBarLabel: "Planos",
                tabBarIcon: ({ color, size, focused, }) => (
                  <Ionicons name="pricetag-outline"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="sobre"
              options={{
                title: "Sobre",
                headerShown: false,
                tabBarLabel: "Sobre",
                tabBarIcon: ({ color, size, focused, }) => (
                  <Ionicons name="information-circle-outline"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="faq"
              options={{
                title: "FAQ",
                headerShown: false,
                tabBarLabel: "FAQ",
                tabBarIcon: ({ color, size, focused, }) => (
                  <Ionicons name="help-circle-outline"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="email"
              options={{
                title: "Email",
                headerShown: false,
                tabBarLabel: "Email",
                tabBarIcon: ({ color, size, focused, }) => (
                  <Ionicons name="mail-outline"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="whatsapp"
              options={{
                title: "Whatsapp",
                headerShown: false,
                tabBarLabel: "Whatsapp",
                tabBarIcon: ({ color, size, focused, }) => (
                  <Ionicons name="logo-whatsapp"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="modo"
              options={{
                title: "Modo",
                headerShown: false,
                tabBarLabel: "Modo",
                tabBarIcon: ({ color, size, focused, }) => (
                  <Ionicons name="moon-outline"
                    color={focused ? iconFocusedColor : color} // Verde se focado, cor padrão caso contrário
                    size={size}
                  />
                ),
              }}
            />
          </Tabs>
        </React.Fragment>
      </AppThemeProvider>
    </GestureHandlerRootView>
  )
}
