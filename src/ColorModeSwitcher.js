import React from 'react';
import { useColorMode, useColorModeValue, IconButton,
  Heading,
  Stack
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <><Stack  direction="row" spacing={4}
      justifyContent="space-between"
    align="center">

      <Heading mt={8} ml={4}>
        Chacha Chaudhary
      </Heading>
      <IconButton
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        mb={8}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        {...props}
      />
      </Stack>
    </>
  );
};
