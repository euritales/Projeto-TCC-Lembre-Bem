"use client";

import { useEffect, useState } from "react";
import ReminderCard from "@/components/cards/ReminderCard";
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
import { FaBell, FaPlus, FaSearch } from "react-icons/fa";
import ReminderForm from "@/components/forms/ReminderForm";
import { useReminder } from "@/context/ReminderContext";
import { useDependente } from "@/context/DependentContext";
import { useTreatment } from "@/context/TreatmentContext";

const RemindersPage = () => {
  const { reminders, getReminders } = useReminder();
  const { getDependents } = useDependente();
  const { getTratamentos } = useTreatment();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getReminders();
    getDependents();
    getTratamentos();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredReminders = reminders.filter(
    (reminder) =>
      reminder.dependenteId.nome
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reminder.tratamentoId.nome
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.lg" py={6}>
      <Flex mb={4} alignItems={"center"}>
        <FaBell color="#4a5568" fontSize="24px" />
        <Heading px={2} color="gray.600" as="h1" size="xl">
          Lembretes
        </Heading>
      </Flex>
      <InputGroup mb={2}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Buscar lembrete..."
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
        {filteredReminders?.length > 0 ? (
          filteredReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              id={reminder.id}
              dependenteId={reminder.dependenteId}
              tratamentoId={reminder.tratamentoId}
              unidade={reminder.unidade}
              dose={reminder.dose}
              dias={reminder.dias}
              horarios={reminder.horarios}
              tipoTratammento={reminder.tratamentoId?.tipo || undefined}
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
              src="/assets/reminder-empty.png"
              alt="Sem lembretes"
              boxSize="150px"
              marginBottom={4}
            />
            <Text fontSize="lg" color="gray.500">
              Não há Lembretes Cadastrados
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
        Criar Lembrete
      </Button>
      <ReminderForm isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default RemindersPage;
