import {
  Box,
  Text,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { FaEdit, FaPills, FaRunning, FaTrash, FaUser } from "react-icons/fa";
import { useReminder } from "@/context/ReminderContext";
import ReminderEditForm from "../forms/ReminderEditForm";

interface ReminderCardProps {
  id: number;
  dependenteId: { id: number; nome: string };
  tratamentoId: { id: number; nome: string };
  unidade: string;
  dose: number;
  dias: string[];
  horarios: {
    horaLembrete: string;
    status: boolean;
    horaAplicacao?: string | null;
  }[];
  tipoTratammento: string | undefined;
}

const ReminderCard: React.FC<ReminderCardProps> = ({
  id,
  dependenteId,
  tratamentoId,
  unidade,
  dose,
  dias,
  horarios,
  tipoTratammento,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const { deleteReminder, getReminders } = useReminder();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleDelete = async () => {
    try {
      await deleteReminder(id);
      await getReminders();
      toast({
        title: "Lembrete deletado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position:'top-right',

      });
      onDeleteClose();
    } catch (error) {
      toast({
        title: "Erro ao deletar lembrete",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'bottom-right',

      });
      console.error("Failed to delete reminder:", error);
    }
  };

  const formatTime = (time: string) => time.slice(0, 5); // Remove os segundos

  const diasAbreviados = dias.map(dia => {
    switch (dia.toLowerCase()) {
      case "domingo": return "Dom";
      case "segunda-feira": return "Seg";
      case "terça-feira": return "Ter";
      case "quarta-feira": return "Qua";
      case "quinta-feira": return "Qui";
      case "sexta-feira": return "Sex";
      case "sábado": return "Sáb";
      default: return dia;
    }
  });

  return (
    <Box
      borderWidth="1px"
      borderRadius="4"
      borderColor={"#4a5568"}
      overflow="hidden"
      mb={4}
      boxShadow="md"
    >
      <Accordion allowToggle>
        <AccordionItem border={0}>
          <AccordionButton
            px={2}
            h={"80px"}
            bg={"#006494"}
            _hover={{ bg: "#003554" }}
            onClick={onToggle}
            height={"60px"}
          >
            <AccordionIcon fontSize={"28px"} color="#FFFFFF" />
            <Flex
              flex="1"
              textAlign="left"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems={"start"} flexDir={"column"}>
                <Flex alignItems={"center"}>
                  <FaUser
                    fontSize={"16px"}
                    color="#FFFFFF"
                  />
                  <Text
                    marginX={2}
                    fontWeight="bold"
                    fontSize="sm"
                    variant="subtle"
                    color="#FFFFFF"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {dependenteId.nome}
                  </Text>
                </Flex>

                <Flex alignItems="center">
                  {tipoTratammento &&
                    (tipoTratammento === "MEDICAMENTO" ? (
                      <FaPills color="#FFFFFF" fontSize="16px" />
                    ) : (
                      <FaRunning color="#FFFFFF" fontSize="16px" />
                    ))}
                  <Text ml={2} fontWeight="bold" fontSize="sm" color="#FFFFFF">
                    {tratamentoId.nome}
                  </Text>
                </Flex>
                {!isOpen && (
                  <Badge
                    bg={"transparent"}
                    color={isOpen ? "transparent" : "white"}
                    background={isOpen ? "transparent" : "#003554"}
                    fontSize={"10px"}
                  >
                    Abrir para ver mais detalhes
                  </Badge>
                )}
              </Flex>
            </Flex>
          </AccordionButton>
          <AccordionPanel
            display={"flex"}
            flexDir={"column"}
            bg={"#fbfcff"}
            pb={4}
          >
            <Badge fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Unidade:</strong> {unidade ? unidade : "--"}
            </Badge>
            <Badge fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Dose:</strong> {dose ? dose : "--"}
            </Badge>
            <Badge fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Dias:</strong> {diasAbreviados.join(", ")}
            </Badge>
            <Badge fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Horas:</strong>{" "}
              {horarios.map((h) => formatTime(h.horaLembrete)).join(" - ")}
            </Badge>
            <Flex marginTop={4} justifyContent={"flex-end"}>
              <Button
                rightIcon={<FaEdit fontSize={"16px"} />}
                variant="solid"
                aria-label="Editar"
                size="xs"
                mr={2}
                colorScheme="blue"
                color="white"
                fontSize="14px"
                borderWidth="1px"
                borderColor={"#grey"}
                borderRadius={4}
                onClick={onEditOpen}
              >
                Editar
              </Button>
              <Button
                rightIcon={<FaTrash fontSize={"16px"} />}
                variant="outline"
                aria-label="Excluir"
                size="xs"
                colorScheme="red"
                fontSize="14px"
                borderRadius={4}
                onClick={onDeleteOpen}
              >
                Excluir
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Tem certeza que deseja excluir o lembrete{" "}
            <Text fontWeight={"bold"}>
              {tratamentoId.nome} para {dependenteId.nome}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onDeleteClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ReminderEditForm
        isOpen={isEditOpen}
        onClose={onEditClose}
        initialData={{
          id,
          dependenteId,
          tratamentoId,
          unidade,
          dose,
          dias,
          horarios,
          status: horarios.some((h) => h.status),
        }}
      />
    </Box>
  );
};

export default ReminderCard;
