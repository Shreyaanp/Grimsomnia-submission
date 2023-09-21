import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { RecipientCounselling } from './Components/RecipientCounselling'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Stack>
        <ColorModeSwitcher/>
        <RecipientCounselling />
      </Stack>
    </ChakraProvider>
  );
}

export default App;
