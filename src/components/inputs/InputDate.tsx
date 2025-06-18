import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppTheme } from "@/context/AppThemeContext";

interface InputDateProps {
  label: string;
  value: Date;
  onChangeText: (val: Date) => void;
  onBlur?: () => void;
  error?: string;
}

export function InputDate({
  label,
  value,
  onChangeText,
  onBlur,
  error,
}: InputDateProps) {
  const { theme } = useAppTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChangeText(selectedDate);
    }
    onBlur?.();
  };

  const formattedDate = value
    ? value.toLocaleDateString("pt-BR")
    : "Selecionar data";

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[theme.label, { marginBottom: 4 }]}>{label}</Text>

      <TouchableOpacity
        style={[
          theme.inputContainer,
          { paddingVertical: 12, paddingHorizontal: 10 },
        ]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={theme.inputText}>{formattedDate}</Text>
      </TouchableOpacity>

      {error && <Text style={theme.inputError}>{error}</Text>}

      {showPicker && Platform.OS === "ios" ? (
        <Modal transparent animationType="fade">
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onPress={() => setShowPicker(false)}
          >
            <View
              style={{
                backgroundColor: theme.card.backgroundColor,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            </View>
          </Pressable>
        </Modal>
      ) : (
        showPicker && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )
      )}
    </View>
  );
}
