// src/components/forms/DependentEditForm.tsx

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDependente } from "@/context/DependentContext";

interface DependentEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    id: number;
    nome: string;
    dataNascimento: string;
    peso: string;
    comorbidades: string[];
    observacao: string;
  };
}

interface FormValues {
  nome: string;
  dataNascimento: string;
  peso: string;
  comorbidade: string;
  observacao: string;
}

const DependentEditForm: React.FC<DependentEditFormProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const { updateDependent, getDependents } = useDependente();
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      nome: initialData.nome,
      dataNascimento: initialData.dataNascimento,
      peso: initialData.peso,
      comorbidade: initialData.comorbidades.join(", "),
      observacao: initialData.observacao,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await updateDependent(initialData.id, {
        nome: data.nome,
        dataNascimento: data.dataNascimento,
        peso: data.peso,
        comorbidade: data.comorbidade.split(",").map((c) => c.trim()),
        observacao: data.observacao,
      });
      toast({
        title: "Dependente editado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position:'top-right',

      });
      await getDependents(); // Atualizar a lista de dependentes
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao editar dependente",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'bottom-right',

      });
      console.error("Failed to update dependent:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader  backgroundColor={"#3182ce"} color={"#FFFFFF"}>Editar Dependente</ModalHeader>
        <ModalCloseButton color={"#FFFFFF"}/>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input {...register("nome", { required: true })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="date"
                {...register("dataNascimento", { required: true })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Peso</FormLabel>
              <Input {...register("peso", { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Comorbidades (separadas por vírgulas)</FormLabel>
              <Input {...register("comorbidade")} />
            </FormControl>
            <FormControl>
              <FormLabel>Observações</FormLabel>
              <Input {...register("observacao")} />
            </FormControl>
            <Flex mt={8} justifyContent={"flex-end"}>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" type="submit">
            Atualizar
          </Button>
        </Flex>
          </form>
        </ModalBody>
       
      </ModalContent>
    </Modal>
  );
};

export default DependentEditForm;
