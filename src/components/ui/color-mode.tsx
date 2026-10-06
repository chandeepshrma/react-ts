import * as React from "react";

type ColorMode = "light" | "dark";

type ColorModeContextValue = {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
};

const ColorModeContext =
  React.createContext<ColorModeContextValue | null>(null);

export function ColorModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(() => {
    const saved = localStorage.getItem("color-mode");

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      colorMode === "dark"
    );

    localStorage.setItem("color-mode", colorMode);
  }, [colorMode]);

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
  };

  const toggleColorMode = () => {
    setColorModeState((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        setColorMode,
        toggleColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = React.useContext(ColorModeContext);

  if (!context) {
    throw new Error(
      "useColorMode must be used within ColorModeProvider"
    );
  }

  return context;
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();

  return colorMode === "dark" ? dark : light;
}