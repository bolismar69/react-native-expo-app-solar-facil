import { View, Text, TouchableOpacity } from "react-native";
import { Controller, useForm, DefaultValues, Path } from "react-hook-form";
import { InputText } from "@/components/inputs/InputText";
import { FieldDefinitionType } from "@/types/FieldDefinitionType";
import { useAppTheme } from "@/context/AppThemeContext";
import { validateFormData } from "@/utils/validateFormData";

interface FormSectionProps<T extends Record<string, any>> {
  title?: string;
  fields: FieldDefinitionType<T>[];
  initialValues: DefaultValues<T>;
  onSubmit?: (data: T) => void;
}

export function FormSectionV3<T extends Record<string, any>>({
  title,
  fields,
  initialValues,
  onSubmit,
}: FormSectionProps<T>) {
  const { theme } = useAppTheme();

  const {
    control,
    setError,
    getValues,
    formState: { errors },
  } = useForm<T>({ defaultValues: initialValues });

  const handleValidationAndSubmit = () => {
    console.log("handleValidationAndSubmit");
    const formData = getValues();
    const validationErrors = validateFormData(formData, fields);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([fieldName, message]) => {
        setError(fieldName as Path<T>, { message }); // ✅ CORRETO AGORA
      });
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <View style={{ gap: 16 }}>
      {title && <Text style={[theme.title]}>{title}</Text>}

      {fields.map((field) => (
        <Controller
          key={field.name as string}
          control={control}
          name={field.name as Path<T>}
          rules={{
            required: field.required ? `${field.label} é obrigatório` : undefined,
            pattern: field.pattern
              ? {
                value: field.pattern,
                message: field.errorMessage || "Formato inválido",
              }
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
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            const hasError = errors?.[field.name as keyof T];
            const isValid = !hasError && !!value;
            const displayedValue =
              isValid && field.formattedValue ? field.formattedValue(value) : value;

            return (
              <InputText
                label={field.label}
                placeholder={field.placeholder}
                value={displayedValue}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType={field.keyboardType}
                options={field.options}
                error={errors?.[field.name as keyof T]?.message as string}
              />
            );
          }}
        />
      ))}

      {onSubmit && (
        <TouchableOpacity
          style={[theme.button, { marginTop: 16 }]}
          onPress={handleValidationAndSubmit}
        >
          <Text style={theme.buttonText}>Enviar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
