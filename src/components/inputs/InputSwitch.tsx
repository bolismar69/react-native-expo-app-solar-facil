import React from "react";
import { View, Text, Switch } from "react-native";
import { useAppTheme } from "@/context/AppThemeContext";

interface InputSwitchProps {
  label: string;
  value: boolean;
  onChangeText: (val: boolean) => void;
  onBlur?: () => void;
  error?: string;
}

export function InputSwitch({
  label,
  value,
  onChangeText,
  onBlur,
  error,
}: InputSwitchProps) {
  const { theme } = useAppTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={theme.label}>{label}</Text>
        <Switch
          value={value}
          onValueChange={(val) => {
            onChangeText(val);
            onBlur?.();
          }}
          trackColor={{ false: "#ccc", true: theme.primary }}
          thumbColor={value ? theme.secondary : "#f4f3f4"}
        />
      </View>

      {error && <Text style={theme.inputError}>{error}</Text>}
    </View>
  );
}
