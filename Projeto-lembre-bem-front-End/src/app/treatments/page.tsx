// src/app/treatments/page.tsx

"use client";

import { useState, useEffect } from "react";
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
import { FaPills, FaPlus, FaSearch } from "react-icons/fa";
import { useTreatment } from "@/context/TreatmentContext";
import TreatmentCard from "@/components/cards/TreatmentCard";
import TreatmentForm from "@/components/forms/TreatmentForm";
import { useReminder } from "@/context/ReminderContext";

// Tipo de tratamento
type Treatment = {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: string;
};

const TreatmentsPage = () => {
  const { tratamentos, getTratamentos } = useTreatment();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    getTratamentos();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTreatments = tratamentos.filter((treatment) =>
    treatment.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.lg" py={6}>
      <Flex mb={4} alignItems={"center"}>
        <FaPills color="#4a5568" fontSize="24px" />
        <Heading px={2} color="gray.600" as="h1" size="xl">
          Tratamentos
        </Heading>
      </Flex>
      <InputGroup mb={2}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Buscar tratamento..."
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
        {filteredTreatments?.length > 0 ? (
          filteredTreatments.map((treatment) => (
            <TreatmentCard
              key={treatment.id}
              id={treatment.id}
              nome={treatment.nome}
              quantidade={treatment.quantidade}
              unidade={treatment.unidade}
              tipo={treatment.tipo}
            />
          ))
        ) : (
          <Flex
            backgroundColor={"white"}
            direction={"column"}
            height={"100%"}
            justifyContent={"center"}
            alignItems="center"
            textAlign="center"
          >
            <Image
              src="/assets/treatment-empty.png"
              alt="Sem lembretes"
              boxSize="150px"
              marginBottom={4}
            />
            <Text fontSize="lg" color="gray.500">
              Não há Tratamentos cadastrados
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
        Cadastrar Tratamento
      </Button>
      <TreatmentForm isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default TreatmentsPage;
