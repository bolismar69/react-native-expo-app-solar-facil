import { AppThemeStyles } from "@/types/ThemeTypes";

export const darkTheme: AppThemeStyles = {
  primary: "#A5C9CA", // Azul claro
  secondary: "#1E5631", // Verde escuro
  links: "#bb86fc", // Roxo para links

  basicView: {
    backgroundColor: "#121212",
  },
  basicText: {
    color: "#ffffff",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#bbbbbb",
    marginBottom: 32,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "left",
    lineHeight: 24,
  },

  card: {
      backgroundColor: "#1e1e1e",
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
    color: "#A5C9CA",
    marginBottom: 8,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#bb86fc",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "center",
  },

  secondaryButton: {
    backgroundColor: "#1E5631",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "center",
  },

  buttonText: {
    color: "#000000",
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
    borderColor: "#444",
    backgroundColor: "#1f2937", // cinza escuro
    color: "#f9fafb",
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
    color: "#f9fafb",
    marginBottom: 4,
    fontWeight: "bold",
  },
  inputError: {
    color: "#ff0000", // Vermelho para erros
    borderColor: "#ff0000", // Vermelho para bordas de erro
    borderWidth: 1,
    backgroundColor: "#1f2937", // cinza escuro
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    backgroundColor: "#1f1f1f",
  },
  label: {
    fontSize: 14,
    color: "#eee",
    fontWeight: "500",
  },
  placeholder: {
    color: "#888",
  },

  tab: {
    backgroundColor: "#1e1e1e",
    activeColor: "#bb86fc", // Roxo para o texto ativo
    inactiveColor: "#888888", // Cinza para o texto inativo
    indicatorColor: "#bb86fc", // Roxo para o indicador
  },
  screen: {
    backgroundColor: "#121212",
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
    borderColor: "#444",
    backgroundColor: "#1f2937", // cinza escuro
    color: "#f9fafb",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
};
