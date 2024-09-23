// src/app/dependents/page.tsx

"use client";

import { useState, useEffect } from "react";
import DependentCard from "@/components/cards/DependentCard";
import DependentForm from "@/components/forms/DependentForm";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus, FaSearch, FaUsers } from "react-icons/fa";
import { useDependente } from "@/context/DependentContext";

// Tipo de dependente
type Dependent = {
  id: number;
  nome: string;
  dataNascimento: string;
  peso: string;
  comorbidade: string[];
  observacao: string;
};

const DependentsPage = () => {
  const { dependentes, getDependents } = useDependente();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getDependents();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDependents = dependentes.filter((dependent) =>
    dependent.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.lg" py={6}>
      <Flex mb={4} alignItems={"center"}>
      <FaUsers color="#4a5568" fontSize="24px" />
      <Heading  px={2} color="gray.600" as="h1" size="xl" >
        Dependentes
      </Heading>
      </Flex>
      <InputGroup mb={2}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Buscar dependente..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>
      <Box
        bg="#eff1f3"
        h="60vh"
        overflowY="auto"
        p={2}
        borderWidth="1px"
        borderRadius="lg"
      >
        {filteredDependents?.length > 0 ? (filteredDependents.map((dependent) => (
          <DependentCard
            id={dependent.id}
            key={dependent.id}
            name={dependent.nome}
            dateOfBirth={dependent.dataNascimento}
            weight={dependent.peso}
            comorbidities={dependent.comorbidade}
            observation={dependent.observacao}
          />
        ))):(
<Flex
            backgroundColor={"white"}
            direction={"column"}
            height={"100%"}
            justifyContent={"center"}
            alignItems="center"
            textAlign="center"
          >
            <Image
              src="/assets/dependent-empty.png"
              alt="Sem lembretes"
              boxSize="150px"
              marginBottom={4}
            />
            <Text fontSize="lg" color="gray.500">
              Não há Dependentes Cadastrados
            </Text>
          </Flex>
        )}
      </Box>
      <Button
        borderRadius={50}
        borderWidth={1}
        borderColor={"gray"}
        boxShadow="xl"
        position="fixed"
        bottom="70px"
        right="10px"
        zIndex="1000"
        size="lg"
        colorScheme="blue"
        leftIcon={<FaPlus />}
        onClick={onOpen}
      >
        Cadastrar Dependentes
      </Button>
      <DependentForm isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default DependentsPage;
