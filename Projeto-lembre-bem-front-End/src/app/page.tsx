// app/page.tsx

import { Box, Button, Flex, Heading, Image, Container, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Page() {
  return (
    <Container maxW="container.md" centerContent py={10}>
      <Flex direction="column" align="center">
        <Image src="/assets/LembreBem-icon.png" alt="Logo Lembre Bem" boxSize="100px" mb={6} />
        <Heading as="h1" color="gray.600" size="xl" textAlign="center" mb={6}>
          LEMBRE BEM
        </Heading>
        <Text fontSize="lg" fontWeight={"500"} textAlign="center" color="gray.500" mb={6}>
        Facilite os cuidados dos seus dependentes de forma eficiente e segura.
        </Text>
        {/* <Heading as="h2" size="md" textAlign="center" mb={6} color="gray.500">
          Gerencie os cuidados com seus dependentes de forma eficiente e segura.
        </Heading> */}
        <NextLink href="/home" passHref>
          <Button colorScheme="blue" size="lg">
            Entrar
          </Button>
        </NextLink>
        <Flex
            backgroundColor={"white"}
            height={"100%"}
            justifyContent={"center"}
            alignItems="center"
            textAlign="center"
          >
            <Image
              src="/assets/initial-01.png"
              alt="Sem lembretes"
              boxSize="150px"
              marginBottom={4}
            />
              <Image
              src="/assets/initial-02.png"
              alt="Sem lembretes"
              boxSize="150px"
              marginBottom={4}
            />
          </Flex>
      </Flex>
    </Container>
  )
}
