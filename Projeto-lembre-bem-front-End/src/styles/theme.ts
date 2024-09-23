// src/styles/theme.ts
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#00203FFF", // Azul Escuro
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    secondary: {
      100: "#ffecb3",
      200: "#ffe082",
      300: "#ffd54f",
      400: "#ffca28",
      500: "#ADEFD1FF", // Laranja Claro
      600: "#ffb300",
      700: "#ffa000",
      800: "#ff8f00",
      900: "#ff6f00",
    },
    neutral: {
      100: "#fafafa",
      200: "#f5f5f5",
      300: "#eeeeee",
      400: "#e0e0e0",
      500: "#bdbdbd",
      600: "#9e9e9e",
      700: "#757575",
      800: "#616161",
      900: "#424242",
      950: "#212121",
      1000: "#101820FF", // Cinza Escuro
    },
    feedback: {
      success: "#00A676FF", // Verde Sucesso
      error: "#D72638FF", // Vermelho Erro
    },
  },
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: "#FFFFFF", // Background branco
      },
    },
  },
});
