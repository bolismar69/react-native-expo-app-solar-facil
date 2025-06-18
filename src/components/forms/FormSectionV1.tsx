// src/components/forms/FormSection.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { Controller, useForm, DefaultValues } from "react-hook-form";
import { InputText } from "@/components/inputs/InputText";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { useAppTheme } from "@/context/AppThemeContext";

interface FormSectionProps<T extends Record<string, any>> {
  title?: string;
  fields: FieldDefinitionType<T>[];
  initialValues: DefaultValues<T>; // Ajustado para DefaultValues<T>
  onSubmit?: (data: T) => void;
}

export function FormSectionV1<T extends Record<string, any>>({
  title,
  fields,
  initialValues,
  onSubmit,
}: FormSectionProps<T>) {
  const { theme } = useAppTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ defaultValues: initialValues });

  return (
    <View style={{ gap: 16 }}>
      {title && <Text style={[theme.title]}>{title}</Text>}

      {fields.map((field) => (
        <Controller
          key={field.name as string}
          control={control}
          name={field.name as any}
          rules={{
            required: field.required ? `${field.label} é obrigatório` : undefined,
            pattern: field.pattern
              ? { value: field.pattern, message: field.errorMessage || "Formato inválido" }
              : undefined,
            validate: field.validation
              ? (value) => {
                if (typeof field.validation === "function") {
                  const validationResult = field.validation(value);
                  return validationResult || true; // Retorna true se a validação passar
                }
                return true;
              }
              : undefined,
            // validate:
            //   field.name === "cpf"
            //     ? (value) =>
            //       isValidCPF(value) || "CPF inválido"
            //     : undefined,
          }}
          // render={({ field: { onChange, onBlur, value } }) => (
          //   <InputText
          //     label={field.label}
          //     placeholder={field.placeholder}
          //     value={value}
          //     onChangeText={onChange}
          //     onBlur={onBlur}
          //     keyboardType={field.keyboardType}
          //     options={field.options} // Passa as opções para o InputText
          //     error={errors?.[field.name as keyof T]?.message as string}
          //   />
          // )}

          //
          render={({ field: { onChange, onBlur, value } }) => {
            const rawValue = typeof value === "string" ? value : "";
            const error = errors?.[field.name as keyof T]?.message;

            // Se existir função de formatação e o campo estiver válido, aplicar
            const isValid = !error;
            const displayedValue = isValid && field.formattedValue
              ? field.formattedValue(rawValue)
              : rawValue;

            return (
              <InputText
                label={field.label}
                placeholder={field.placeholder}
                value={displayedValue}
                onChangeText={(text) => {
                  const cleaned = text.replace(/\D/g, "");
                  onChange(cleaned);
                }}
                onBlur={onBlur}
                keyboardType={field.keyboardType}
                error={error as string}
              />
            );
          }}
        />
      ))}

      {/* {onSubmit && (
        <InputText
          label=""
          placeholder="Enviar"
          onPress={handleSubmit(onSubmit)}
          isButton
        />
      )} */}
      {onSubmit && (
        <TouchableOpacity
          style={[theme.button, { marginTop: 16 }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={theme.buttonText}>Enviar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
