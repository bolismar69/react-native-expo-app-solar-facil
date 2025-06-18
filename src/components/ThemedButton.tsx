import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/AppThemeContext";

type Props = {
  onPress: () => void;
};

export function ThemedButton({ onPress }: Props) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={[theme.button]} onPress={onPress}>
      <Text style={theme.buttonText}>Alternar Tema</Text>
    </TouchableOpacity>
  );
}

export default ThemedButton;
