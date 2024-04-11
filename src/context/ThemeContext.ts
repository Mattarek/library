import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

// Funkcja sprawdzająca, czy nasz komponent jest owrappowany w providera z kontekstem
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("Missing themeContext, it's not wrapped in ThemeProvider");
  }
  return ctx;
};
