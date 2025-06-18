// /src/app/home.tsx
import React from "react";
import HomeScreen from "@/screens/general/HomeScreen";

// navegação com STACK e Link do expo-router
// https://expo.github.io/router/docs/intro
export default function Index() {
  console.log("Index Screen");
  return (
    <HomeScreen />
  );
}
