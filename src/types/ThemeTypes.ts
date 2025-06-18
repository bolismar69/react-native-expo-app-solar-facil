import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export interface AppThemeStyles {
  inputBorder: any;
  primary: string;
  secondary: string;
  links: string;

  basicView: ViewStyle;
  basicText: TextStyle;

  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  text: TextStyle;
  highlightText: TextStyle;

  button: ViewStyle;
  secondaryButton: ViewStyle;
  buttonText: TextStyle;

  card: ViewStyle;
  imagePreview: ImageStyle;

  iconContainer: ViewStyle;

  inputText: TextStyle;
  inputContainer: ViewStyle;
  inputLabel: TextStyle;
  inputError: TextStyle;

  placeholder: TextStyle;
  label: TextStyle;
  input: TextStyle;

  tab: {
    backgroundColor: string;
    activeColor: string;  
    inactiveColor: string;
    indicatorColor: string;
  };
  screen: {
    backgroundColor: string;
    flex: number;
    padding: number;
  };

  pickerContainer: ViewStyle;
  pickerError: ViewStyle;

}
