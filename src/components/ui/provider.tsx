// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  ColorModeProvider
} from "./color-mode";

// export function Provider(props: ColorModeProviderProps) {
//   return (
//     <ChakraProvider value={defaultSystem}>
//       <ColorModeProvider {...props} />
//     </ChakraProvider>
//   );
// }

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
      {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}