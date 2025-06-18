export async function enviarFormulario(
  formData: any,
  imageUri: string,
): Promise<void> {
  console.log("Simulando envio do formulário:", formData);
  if (imageUri) {
    console.log("Imagem enviada:", imageUri);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000); // simula delay de 2 segundos
  });
}
