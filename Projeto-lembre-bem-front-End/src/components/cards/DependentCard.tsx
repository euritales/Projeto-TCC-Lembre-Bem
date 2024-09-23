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
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useDependente } from "@/context/DependentContext";
import { useToast } from "@chakra-ui/react";
import DependentEditForm from "../forms/DependentEditForm";

interface DependentCardProps {
  id: number;
  name: string;
  dateOfBirth: string;
  weight: string;
  comorbidities: string[];
  observation: string;
}

const DependentCard: React.FC<DependentCardProps> = ({
  id,
  name,
  dateOfBirth,
  weight,
  comorbidities,
  observation,
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

  const { deleteDependent, getDependents } = useDependente();

  const handleDelete = async () => {
    try {
      await deleteDependent(id);
      await getDependents(); // Atualizar a lista de dependentes
      toast({
        title: "Dependente deletado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position:'top-right',

      });
      onDeleteClose();
    } catch (error) {
      toast({
        title: "Erro ao deletar dependente",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'bottom-right',

      });
      console.error("Failed to delete dependent:", error);
    }
  };

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
                <Flex alignItems={"center"} justifyContent={"start"}>
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
                    {name}
                  </Text>
                </Flex>
                {!isOpen &&
                  <Badge
                    bg={"transparent"}
                    color={isOpen ? "transparent" : "white"}
                    background={isOpen ? "transparent" : "#003554"}
                    fontSize={"10px"}
                  >
                    Abrir para ver mais detalhes
                  </Badge>
                }
              </Flex>
            </Flex>
          </AccordionButton>
          <AccordionPanel display={"flex"}  flexDir={"column"} bg={"#fbfcff"} pb={4}>
            <Badge  fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Data de Nascimento:</strong> {dateOfBirth}
            </Badge>
            <Badge fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Peso:</strong> {weight} kg
            </Badge>
            <Badge fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Comorbidades:</strong>{" "}
              {comorbidities[0] == "" ? " - -" :  comorbidities.join(", ") }
            </Badge>
            <Badge fontSize={"12px"} whiteSpace="pre-wrap" wordBreak="break-word">
              <strong>Observações:</strong> {observation== "" ? " - -" : observation}
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
            Tem certeza que deseja excluir o dependente <Text fontWeight={"bold"}>{name}?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" onClick={onDeleteClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DependentEditForm
        isOpen={isEditOpen}
        onClose={onEditClose}
        initialData={{
          id,
          nome: name,
          dataNascimento: dateOfBirth,
          peso: weight,
          comorbidades: comorbidities,
          observacao: observation,
        }}
      />
    </Box>
  );
};

export default DependentCard;
