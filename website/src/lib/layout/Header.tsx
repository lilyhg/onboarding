import {
  Box,
  useDisclosure,
  HStack,
  Image,
  Spacer,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSignOut } from "react-supabase";
import { useRecoilValue } from "recoil";

import LoginModal from "lib/components/login";
import { userState } from "lib/state";

// Header that appears on some screens.
const Header = () => {
  const userInfo = useRecoilValue(userState);
  const signOut = useSignOut()[1];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signInCallback = () => {
    onOpen();
  };

  const signOutCallback = () => {
    signOut();
  };

  return (
    <Box
      as="nav"
      // bg="bg-surface"
      bg="white"
      boxShadow="sm"
      px={[4, 8]}
      py={4}
      mb={4}
      position="sticky"
      top={0}
      left={0}
      width="100%"
      zIndex={999}
    >
      <LoginModal isOpen={isOpen} onClose={onClose} />
      <Flex alignItems="center" justifyItems="center">
        <Link href="https://labdao.com" passHref>
          <a>
            <HStack
              width="33%"
              spacing="3"
              alignItems="center"
              justifyItems="center"
            >
              <Image boxSize={["30px", "60px"]} src="/labdao_logo.png" />
              <HStack spacing="0">
                <Text
                  textAlign="left"
                  fontSize={[20, 40]}
                  fontWeight="semibold"
                  fontFamily="Inert, sans-serif"
                >
                  Lab
                </Text>
                <Text textAlign="left" fontWeight="light" fontSize={[20, 40]}>
                  DAO
                </Text>
              </HStack>
            </HStack>
          </a>
        </Link>
        <Spacer />
        <HStack spacing="2">
          <Button
            boxShadow="md"
            bg="#B7FFDC"
            color="green.700"
            px="10"
            py="1"
            fontWeight="medium"
            onClick={userInfo.authenticated ? signOutCallback : signInCallback}
          >
            {userInfo.authenticated
              ? userInfo.fullName || userInfo.email
              : "Sign In"}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
