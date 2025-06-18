import React from "react";
import { View, Text, TextInput } from "react-native";
import { useAppTheme } from "@/context/AppThemeContext";

interface InputTextareaProps {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  numberOfLines?: number;
  maxLength?: number;
}

export function InputTextarea({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  numberOfLines = 4,
  maxLength = 500,
}: InputTextareaProps) {
  const { theme } = useAppTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={theme.label}>{label}</Text>
      <TextInput
        style={[
          theme.inputText,
          {
            textAlignVertical: "top",
            minHeight: numberOfLines * 24,
          },
        ]}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder.color}
      />
      {error && <Text style={theme.inputError}>{error}</Text>}
    </View>
  );
}
