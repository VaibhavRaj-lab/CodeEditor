import { createTheme } from '@chakra-ui/react';  // Use createTheme instead of extendTheme

const theme = createTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;