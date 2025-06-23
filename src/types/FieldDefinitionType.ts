// src/types/FormField.ts
export type FieldDefinitionType<T> = {
  name: keyof T;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  type: "text" | "email" | "number" | "select" | "date" | "password" | "phone" | "checkbox" | "switch" | "radio" | "textarea";
  options?: { label: string; value: string }[]; // For select fields
  required?: boolean; // Indicates if the field is mandatory
  validation?: (value: any) => string | null; // Custom validation function
  formattedValue?: (value: any) => string; // Função de formatação customizada (ex: formatar CPF)
  defaultValue?: any; // Default value for the field
  pattern?: RegExp; // Regex pattern for validation
  errorMessage?: string; // Custom error message for validation
  toUpperCase?: boolean; // Propriedade para transformar o texto em maiúsculo
  toLowerCase?: boolean; // Propriedade para transformar o texto em minúsculo
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
  mask?: string; // Máscara de entrada para campos específicos (ex: CPF, CNPJ)
  inputProps?: Record<string, any>; // Propriedades adicionais para o campo de entrada
  icon?: React.ReactNode; // Ícone associado ao campo
  tooltip?: string; // Dica ou informação adicional sobre o campo
  helpText?: string; // Texto de ajuda para o campo
};
