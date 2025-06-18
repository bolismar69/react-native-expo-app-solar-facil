// src/components/ui/InputText.tsx
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppTheme } from "@/context/AppThemeContext";

interface InputTextProps extends TextInputProps {
  label?: string;
  error?: string;
  isButton?: boolean; // Adiciona a propriedade isButton
  onPress?: () => void; // Adiciona a função para o botão
  options?: { label: string; value: string }[]; // Para campos do tipo select
  value?: string;
  onChangeText?: (value: string) => void;
}

export const InputText: React.FC<InputTextProps> = ({ label, error, options, value, onChangeText, ...props }) => {
  const { theme } = useAppTheme();

  if (options) {
    return (
      <View style={{ marginBottom: 16 }}>
        {label && <Text style={theme.inputLabel}>{label}</Text>}
        <View style={[theme.pickerContainer, error && theme.pickerError]}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChangeText?.(itemValue)}
          >
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
        {error && <Text style={theme.inputError}>{error}</Text>}
      </View>
    );
  }

  // return (
  //   <View style={{ marginBottom: 16 }}>
  //     {label && <Text style={theme.inputLabel}>{label}</Text>}
  //     <TextInput
  //       style={[
  //         theme.input,
  //         { marginTop: 4 },
  //         error && { borderColor: "red", borderWidth: 1 },
  //       ]}
  //       placeholderTextColor={theme.placeholder.color}
  //       {...props}
  //     />
  //     {error && <Text style={theme.inputError}>{error}</Text>}
  //   </View>
  // );
  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={theme.inputLabel}>{label}</Text>}
      <TextInput
        style={[
          theme.input,
          { marginTop: 4 },
          error && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholderTextColor={theme.placeholder.color}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error && <Text style={theme.inputError}>{error}</Text>}
    </View>
  );
};
