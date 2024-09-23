// src/components/cards/TreatmentCard.tsx

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
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPills, FaRunning } from "react-icons/fa";
import { useTreatment } from "@/context/TreatmentContext";
import { useToast } from "@chakra-ui/react";
import TreatmentEditForm from "../forms/TreatmentEditForm";

interface TreatmentCardProps {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: string;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  id,
  nome,
  quantidade,
  unidade,
  tipo,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const { deleteTratamento, getTratamentos } = useTreatment();

  const handleDelete = async () => {
    try {
      await deleteTratamento(id);
      await getTratamentos();
      toast({
        title: "Tratamento deletado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position:'top-right',

      });
      onDeleteClose();
    } catch (error) {
      toast({
        title: "Erro ao deletar tratamento",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'bottom-right',

      });
      console.error("Failed to delete treatment:", error);
    }
  };

  // Função para determinar se a quantidade do medicamento está baixa
  const isQuantidadeBaixa = (quantidade: number) => {
    const limiteBaixo = 5; // Defina o limite que considera a quantidade baixa
    return quantidade < limiteBaixo;
  };


  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
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
            backgroundColor={"#006494"}
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
                <Flex alignItems={"center"} justifyContent={"start"}>
                  {tipo === "MEDICAMENTO" ? (
                    <FaPills fontSize={"16px"} color="#FFFFFF" />
                  ) : (
                    <FaRunning fontSize={"16px"} color="#FFFFFF" />
                  )}

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
                    {nome}
                  </Text>
                </Flex>

                <Flex>
                  <Badge
                    fontSize={"10px"}
                    colorScheme={tipo === "MEDICAMENTO" ? "green" : "blue"}
                  >
                    {tipo}
                  </Badge>
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
            <Badge
              fontSize={"12px"}
              whiteSpace="pre-wrap"
              wordBreak="break-word"
            >
              <strong>Tipo:</strong> {unidade}
            </Badge>
            <Badge
              fontSize={"12px"}
              whiteSpace="pre-wrap"
              wordBreak="break-word"
            >
              <strong>Quantidade:</strong> {quantidade} {unidade}
            </Badge>
            {tipo === "MEDICAMENTO" && isQuantidadeBaixa(quantidade) && (
              <Badge colorScheme="red" fontSize={"12px"}>
                Quantidade Baixa
              </Badge>
            )}

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
            Tem certeza que deseja excluir o tratamento{" "}
            <Text fontWeight={"bold"}>{nome}?</Text>
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

      <TreatmentEditForm
        isOpen={isEditOpen}
        onClose={onEditClose}
        initialData={{ id, nome, quantidade, unidade, tipo }}
      />
    </Box>
  );
};

export default TreatmentCard;
