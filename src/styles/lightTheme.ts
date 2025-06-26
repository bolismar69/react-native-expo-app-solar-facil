import { AppThemeStyles } from "@/types/ThemeTypes";

export const lightTheme: AppThemeStyles = {
  primary: "#1E5631",
  secondary: "#A5C9CA",
  links: "#1E90FF",

  basicView: {
    backgroundColor: "#fff",
  },
  basicText: {
    color: "#000",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E5631",
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginTop: 24,
    marginBottom: 10,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
    textAlign: "left",
    lineHeight: 24,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Substituído por boxShadow
    elevation: 2, // Mantido para compatibilidade com Android
    marginBottom: 16,
  },

  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },

  highlightText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1E5631",
    marginBottom: 8,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#1E5631",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "center",
  },

  secondaryButton: {
    backgroundColor: "#A5C9CA",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28, // Metade do tamanho do ícone para criar um círculo
    width: 56, // Largura igual ao tamanho do ícone
    height: 56, // Altura igual ao tamanho do ícone
  },

  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },
  inputLabel: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "#ff0000", // Vermelho para bordas de erro
    borderWidth: 0.25,
    backgroundColor: "#e8e9eb", // cinza claro
    color: "#ff0000", // Vermelho para texto de erro
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    color: "#111",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  placeholder: {
    color: "#999",
  },

  tab: {
    backgroundColor: "#c3c3c3", //"#fff",
    activeColor: "#1E90FF",
    inactiveColor: "#888",
    indicatorColor: "#1E90FF",
  },
  screen: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    padding: 16,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  pickerError: {
    borderColor: "red",
  },

  inputBorder: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#1f2937", // cinza escuro
    color: "#f9fafb",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },

  safe: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  screenNoFlex: {
    backgroundColor: "#f0f0f0",
    padding: 16,
  },

  linkButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "center",  
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
};
