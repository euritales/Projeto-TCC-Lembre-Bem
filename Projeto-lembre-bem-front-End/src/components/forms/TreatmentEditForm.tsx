// src/components/forms/TreatmentEditForm.tsx

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTreatment } from "@/context/TreatmentContext";
import { useToast } from "@chakra-ui/react";

interface TreatmentEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    id: number;
    nome: string;
    quantidade: number;
    unidade: string;
    tipo: string;
  };
}

type FormValues = {
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: string;
};

const TreatmentEditForm: React.FC<TreatmentEditFormProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const { updateTratamento } = useTreatment();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialData,
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateTratamento(initialData.id, data);
    toast({
      title: "Tratamento atualizado com sucesso!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position:'top-right',
    });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor={"#3182ce"} color={"#FFFFFF"}>Editar Tratamento</ModalHeader>
        <ModalCloseButton color="#FFFFFF"/>
        <ModalBody>
          <FormControl isRequired id="nome" mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input {...register("nome", { required: true })} />
          </FormControl>
          <FormControl isRequired id="quantidade" mb={4}>
            <FormLabel>Quantidade</FormLabel>
            <Input
              type="number"
              {...register("quantidade", { required: true })}
            />
          </FormControl>
          <FormControl isRequired id="unidade" mb={4}>
            <FormLabel>Unidade</FormLabel>
            <Select {...register("unidade", { required: true })}>
              <option value="Adesivo(s)">Adesivo(s)</option>
              <option value="Ampola(s)">Ampola(s)</option>
              <option value="Aplicador(es)">Aplicador(es)</option>
              <option value="Aplicação(ões)">Aplicação(ões)</option>
              <option value="Autoinjetor(es)">Autoinjetor(es)</option>
              <option value="Barra(s)">Barra(s)</option>
              <option value="Bolsa(s)">Bolsa(s)</option>
              <option value="Cápsula(s)">Cápsula(s)</option>
              <option value="Caneta(s)">Caneta(s)</option>
              <option value="Cartucho(s)">Cartucho(s)</option>
              <option value="Chip(s)">Chip(s)</option>
              <option value="colher(es) de chá">colher(es) de chá</option>
              <option value="colher(es) de sopa">colher(es) de sopa</option>
              <option value="Comprimido(s)">Comprimido(s)</option>
              <option value="Copo(s)">Copo(s)</option>
              <option value="Frasco(s)">Frasco(s)</option>
              <option value="Garrafa(s)">Garrafa(s)</option>
              <option value="Goma(s)">Goma(s)</option>
              <option value="Gota(s)">Gota(s)</option>
              <option value="Grama(s)">Grama(s)</option>
              <option value="Inalação(ões)">Inalação(ões)</option>
              <option value="Injeção(ões)">Injeção(ões)</option>
              <option value="Kit(s)">Kit(s)</option>
              <option value="minuto(s)">Minuto(s)</option>
              <option value="mL">mL</option>
              <option value="Pacote(s)">Pacote(s)</option>
              <option value="Pastilha(s)">Pastilha(s)</option>
              <option value="Polegada(s)">Polegada(s)</option>
              <option value="Recipiente(s)">Recipiente(s)</option>
              <option value="Rolo(s)">Rolo(s)</option>
              <option value="Sachê(s)">Sachê(s)</option>
              <option value="Saco(s)">Saco(s)</option>
              <option value="Seringa(s)">Seringa(s)</option>
              <option value="Supositório(s)">Supositório(s)</option>
              <option value="Tablete(s)">Tablete(s)</option>
              <option value="Tira(s)">Tira(s)</option>
              <option value="Unidade(s)">Unidade(s)</option>
              <option value="Vareta(s)">Vareta(s)</option>
            </Select>
          </FormControl>
          <FormControl isRequired id="tipo" mb={4}>
            <FormLabel>Tipo</FormLabel>
            <Select {...register("tipo", { required: true })}>
              <option value="MEDICAMENTO">Medicamento</option>
              <option value="ATIVIDADE">Atividade</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
            Atualizar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TreatmentEditForm;
