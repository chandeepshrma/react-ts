import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { BiChevronDown, BiHeart, BiLogoGithub, BiSearch, BiSun } from "react-icons/bi";
import { NavLink } from "react-router/internal/react-server-client";
import { useColorMode } from "../../../components/ui/color-mode";

const navItems = ["Home", "About", "Blog", "Guides"];

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      w="100%"
      h="70px"
      borderTop="1px solid"
      borderTopColor="red.200"
      borderBottom="1px solid"
      borderBottomColor="gray.100"
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
    >
      <Flex
        h="100%"
        align="center"
        w="100%"
        mx="auto"
        px={{ base: 5, lg: 8 }}
        gap={8}
      >
        {/* Logo */}
        <HStack gap={2} flexShrink={0}>
          <Box
            w="34px"
            h="34px"
            borderRadius="10px"
            bg="linear-gradient(135deg, #20C7C9, #0F9D9A)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              w="17px"
              h="17px"
              bg="white"
              transform="rotate(45deg)"
              opacity={0.95}
            />

            <Box
              position="absolute"
              w="10px"
              h="10px"
              bg="#20C7C9"
              transform="rotate(45deg)"
            />
          </Box>

          <Text
            fontSize="28px"
            fontWeight="700"
            letterSpacing="-1.5px"
            color={colorMode === 'dark' ? 'gray.500' : 'gray.800'}
          >
            Logo
          </Text>
        </HStack>

        {/* Navigation */}
        <HStack
          gap={{ base: 5, lg: 8 }}
          ml={8}
          display={{ base: "none", md: "flex" }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }: { isActive: boolean }) =>
                `${isActive && colorMode !== 'dark' ? "text-blue-900! font-bold! text-lg! underline!" : isActive && colorMode === 'dark' ? " text-gray-500! font-bold! text-lg! underline!" : ""}`
              }
            >
              {item}
            </NavLink>            
          ))}
        </HStack>

        {/* Right side */}
        <HStack ml="auto" gap={3}>
          {/* Sponsor */}
          <Button
            variant="plain"
            display={{ base: "none", lg: "flex" }}
            gap={2}
            fontSize="16px"
            fontWeight="500"
            color={colorMode === 'dark' ? 'gray.500' : 'gray.800'}            
          >
            <Icon color="red.500" boxSize={5}>
              <BiHeart fill="currentColor" />
            </Icon>
            Sponsor
          </Button>

          {/* Version */}
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                borderColor="gray.200"
                borderRadius="6px"
                h="44px"
                px={4}
                fontSize="16px"
                fontWeight="500"
              >
                3.37.0
                <BiChevronDown size={16} />
              </Button>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="3.37.0">3.37.0</Menu.Item>
                  <Menu.Item value="3.36.0">3.36.0</Menu.Item>
                  <Menu.Item value="3.35.0">3.35.0</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          {/* Search */}
          <Box
            position="relative"
            w={{ base: "44px", sm: "220px", lg: "320px" }}
          >
            <Icon
              position="absolute"
              left="14px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.600"
              zIndex={1}
              pointerEvents="none"
            >
              <BiSearch size={20} />
            </Icon>

            <Input
              h="44px"
              pl="44px"
              pr="55px"
              border="none"
              borderRadius="7px"
              bg="gray.50"
              fontSize="16px"
              placeholder="Search..."
              _focus={{
                bg: "white",
                borderColor: "gray.300",
                boxShadow: "0 0 0 1px var(--chakra-colors-gray-300)",
              }}
            />

            <Box
              position="absolute"
              right="10px"
              top="50%"
              transform="translateY(-50%)"
              display={{ base: "none", sm: "block" }}
              px="7px"
              py="2px"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="5px"
              bg="white"
              color="gray.500"
              fontSize="12px"
              fontWeight="500"
            >
              ⌘ K
            </Box>
          </Box>

          {/* GitHub */}
          <Button
            variant="plain"
            p={2}
            display={{ base: "none", sm: "flex" }}
            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
            color={colorMode === 'dark' ? 'gray.200' : 'gray.800'}
            _hover={{
              bg: colorMode === 'dark' ? 'gray.50' : 'gray.200',
            }}
          >
            <BiLogoGithub size={20} />
          </Button>

          {/* colorMode */}
          <Button
            onClick={() => toggleColorMode()}
            variant="plain"
            p={2}
            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
            color={colorMode === 'dark' ? 'gray.200' : 'gray.800'}
            _hover={{
              bg: colorMode === 'dark' ? 'gray.50' : 'gray.200',
            }}
          >
            <BiSun size={20} />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}