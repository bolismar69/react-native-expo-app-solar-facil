import { Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AppThemeProvider } from "@/context/AppThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RootLayout() {
  console.log("RootLayout");
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppThemeProvider>
        <React.Fragment>
          <StatusBar style="auto" />
          <Tabs>
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="associado"
              options={{
                title: "Associado",
                headerShown: true,
                tabBarLabel: "+ Associado",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="people" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="planos"
              options={{
                title: "Planos",
                headerShown: true,
                tabBarLabel: "Planos",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="pricetag-outline" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="sobre"
              options={{
                title: "Sobre",
                headerShown: true,
                tabBarLabel: "Sobre",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="information-circle-outline" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="faq"
              options={{
                title: "FAQ",
                headerShown: true,
                tabBarLabel: "FAQ",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="help-circle-outline" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="email"
              options={{
                title: "Email",
                headerShown: true,
                tabBarLabel: "Email",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="mail-outline" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="whatsapp"
              options={{
                title: "Whatsapp",
                headerShown: true,
                tabBarLabel: "Whatsapp",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="logo-whatsapp" color={color} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="modo"
              options={{
                title: "Modo",
                headerShown: true,
                tabBarLabel: "Modo",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="moon-outline" color={color} size={size} />
                ),
              }}
            />
          </Tabs>
        </React.Fragment>
      </AppThemeProvider>
    </GestureHandlerRootView>
  )
}
