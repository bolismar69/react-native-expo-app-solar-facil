# Configuração do Visual Studio Code para o Projeto Solar Facil

## Descrição

Este documento descreve as **configurações recomendadas** para o **Visual Studio Code** ao trabalhar no projeto **Solar Facil**. Ele inclui boas práticas, extensões e configurações específicas para garantir **consistência** e **produtividade**.

## Configurações do VS Code

### Formatação e Organização de Código

**Formatação automática ao salvar:**

```json
"editor.formatOnSave": true
```

**Ações automáticas ao salvar:**

```json
"editor.codeActionsOnSave": {
  "source.fixAll": "explicit",
  "source.organizeImports": "explicit",
  "source.sortMembers": "explicit"
}
```

### Validação de Código

**Validação do ESLint:**

```json
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact",
  "json"
]
```

### Configuração do Prettier

- **Requer configuração do Prettier:**

```json
"prettier.requireConfig": true
```

- **Usar aspas simples:**

```json
"prettier.singleQuote": true
```

- **Adicionar vírgula no final de objetos e arrays:**

```json
"prettier.trailingComma": "all"
```

### Tailwind CSS

**Suporte para Tailwind CSS em diferentes linguagens:**

```json
"tailwindCSS.includeLanguages": {
  "javascript": "javascript",
  "javascriptreact": "javascript",
  "typescriptreact": "typescript"
}
```

### React Native Tools

**Configuração do diretório raiz do projeto:**

```json
"react-native-tools": {
  "projectRoot": "./"
}
```

### TypeScript

**Usar TypeScript do diretório node_modules:**

```json
"typescript.tsdk": "node_modules/typescript/lib"
```

### Editor

- **Tamanho da tabulação:**

```json
"editor.tabSize": 2
```

- **Detectar indentação automaticamente:**

```json
"editor.detectIndentation": false
```

- **Quebra de linha automática:**

```json
"editor.wordWrap": "on"
```

- **Limites de linha:**

```json
"editor.rulers": [80, 120]
```

### Git

- **Commit inteligente:**

```json
"git.enableSmartCommit": true
```

- **Sincronização sem confirmação:**

```json
"git.confirmSync": false
```

### Explorer

- **Excluir confirmações para ações no Explorer:**

```json
"explorer.confirmDelete": false,
"explorer.confirmDragAndDrop": false
```

## Extensões Recomendadas

- **ESLint**  
  Ajuda a garantir que o código segue as regras de linting configuradas.

- **Prettier - Code Formatter**  
  Formata o código automaticamente com base nas configurações do Prettier.

- **Tailwind CSS IntelliSense**  
  Fornece autocompletar e validação para classes do Tailwind CSS.

- **React Native Tools**  
  Facilita o desenvolvimento de aplicativos React Native.

- **SonarLint**  
  Analisa a qualidade do código e identifica problemas.

## Fluxo de Trabalho

### GitFlow

Utilize o fluxo:

1. develop
2. main
3. feature/fix/chore

### Commits

Siga o padrão **Conventional Commits** para mensagens de commit.

### Linters

- Execute **ESLint** e **Prettier** antes de qualquer Pull Request.

### Testes

Execute os testes com o comando:

```bash
make test
```

### Builds

Realize builds com o comando:

```bash
eas build --platform all
```

## Estrutura de Pastas

```text
src/
  components/       # Componentes reutilizáveis
  screens/          # Telas principais
  services/         # Serviços de API
  hooks/            # Hooks personalizados
  styles/           # Estilos globais
  constants/        # Constantes globais
  apis/             # Configuração de APIs
```

## Tags

- development
- react-native
- expo
- best-practices

## Ferramentas para Editar Markdown

Existem várias ferramentas e editores de texto que permitem editar arquivos `.md`. Algumas opções incluem:

- Editores de texto como **Visual Studio Code**, **Sublime Text**, **Atom**, etc.
- Ferramentas online, como [https://www.pandoc.org/](https://www.pandoc.org/)
- Ferramentas específicas para criação de documentação, como o **GitHub Docs**
