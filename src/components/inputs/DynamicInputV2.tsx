import React from "react";
import { View, Text, TouchableOpacity, Switch, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppTheme } from "@/context/AppThemeContext";
import { InputText } from "@/components/inputs/InputText";

interface Option {
  label: string;
  value: string;
}

interface DynamicInputV2Props {
  type: string;
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  options?: Option[];
  error?: string;
}

export const DynamicInputV2: React.FC<DynamicInputV2Props> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  options,
  error,
}) => {
  const { theme } = useAppTheme();

  if (type === "select" && options) {
    return (
      <View style={{ marginBottom: 16 }}>
        {label && <Text style={theme.inputLabel}>{label}</Text>}
        <View style={[theme.inputContainer]}>
          <Picker selectedValue={value} onValueChange={onChange}>
            {options.map((opt) => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
        </View>
        {error && <Text style={theme.inputError}>{error}</Text>}
      </View>
    );
  }

  if (type === "radio" && options) {
    return (
      <View style={{ marginBottom: 16 }}>
        {label && <Text style={theme.inputLabel}>{label}</Text>}
        {options.map((opt) => (
          <TouchableOpacity key={opt.value} style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }} onPress={() => onChange?.(opt.value)}>
            <View style={{ height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: theme.inputText.color, alignItems: "center", justifyContent: "center", marginRight: 8 }}>
              {value === opt.value && <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: theme.inputText.color }} />}
            </View>
            <Text>{opt.label}</Text>
          </TouchableOpacity>
        ))}
        {error && <Text style={theme.inputError}>{error}</Text>}
      </View>
    );
  }

  if (type === "switch") {
    return (
      <View style={{ marginBottom: 16 }}>
        {label && <Text style={theme.inputLabel}>{label}</Text>}
        <Switch value={value} onValueChange={onChange} />
        {error && <Text style={theme.inputError}>{error}</Text>}
      </View>
    );
  }

  if (type === "textarea") {
    return (
      <View style={{ marginBottom: 16 }}>
        {label && <Text style={theme.inputLabel}>{label}</Text>}
        <TextInput
          style={[theme.input, { height: 100, textAlignVertical: "top" }]}
          multiline
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
        />
        {error && <Text style={theme.inputError}>{error}</Text>}
      </View>
    );
  }

  return (
    <InputText
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={error}
    />
  );
};
