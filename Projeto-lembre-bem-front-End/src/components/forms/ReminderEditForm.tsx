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
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useReminder } from "@/context/ReminderContext";
import { useTreatment } from "@/context/TreatmentContext";
import { useDependente } from "@/context/DependentContext";
import { useToast } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

type Horario = {
  id: number;
  horaLembrete: string;
  status: boolean;
  horaAplicacao?: string | null;
};

interface ReminderEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: any;
}

type FormValues = {
  dependenteId: number;
  tratamentoId: number;
  unidade: string;
  dose: number;
  dias: string[];
  horas: { value: string }[];
  status: boolean;
};

const ReminderEditForm: React.FC<ReminderEditFormProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const { updateReminder } = useReminder();
  const { getDependents, dependentes } = useDependente();
  const { getTratamentos, tratamentos } = useTreatment();
  const [typeTratament, setTypeTratament] = useState<string>("MEDICAMENTO");

  const handleTratamentoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTratamentoId = parseInt(event.target.value, 10);
    const selectedTratamento = tratamentos.find(
      (t) => t.id === selectedTratamentoId
    );
    if (selectedTratamento) {
      setTypeTratament(selectedTratamento.tipo);
    }
  };

  const { register, handleSubmit, control, reset, setValue } =
    useForm<FormValues>({
      defaultValues: {
        dependenteId: initialData.dependenteId.id,
        tratamentoId: initialData.tratamentoId.id,
        unidade: initialData.unidade,
        dose: initialData.dose,
        dias: initialData.dias,
        horas: initialData.horarios.map((hora: Horario) => ({
          value: hora.horaLembrete,
        })), 
        status: initialData.status,
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "horas",
  });
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      getDependents();
      getTratamentos();
      setValue("dependenteId", initialData.dependenteId.id);
      setValue("tratamentoId", initialData.tratamentoId.id);
      setValue("unidade", initialData.unidade);
      setValue("dose", initialData.dose);
      setValue("dias", initialData.dias);
      setValue(
        "horas",
        initialData.horarios.map((hora: Horario) => ({
          value: hora.horaLembrete,
        }))
      );
      setValue("status", initialData.status);
    }
  }, [isOpen]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data, "Aqui");
    const formattedData = {
      dependenteId: data.dependenteId,
      tratamentoId: data.tratamentoId,
      unidade: data.unidade,
      dose: data.dose,
      dias: data.dias,
      // horarios: data.horas.map((hora, index) => ({
      //   id: initialData.horarios[index]?.id || null, // Usar null se o id não estiver disponível
      //   horaLembrete: hora.value,
      //   status: data.status,
      //   horaAplicacao: null,
      // })),
      // status: data.status,
      horarios: data.horas.map((hora) => {
        const matchingHorario = initialData.horarios.find((initialHorario: Horario) => 
            initialHorario.horaLembrete === hora.value
        );

        return {
            id: matchingHorario ? matchingHorario.id : null, // Usar o ID se existir, null se for novo
            horaLembrete: hora.value,
            // Usar status existente baseado na presença de horaAplicacao
            status: matchingHorario ? matchingHorario.status : false, // Manter o status existente ou false para novos
            horaAplicacao: matchingHorario ? matchingHorario.horaAplicacao : null,
        };
    }),
    status: data.status,
    };
    console.log(formattedData);

    try {
      await updateReminder(initialData.id, formattedData);
      toast({
        title: "Lembrete atualizado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position:'top-right',

      });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao atualizar lembrete",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'bottom-right',

      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor={"#3182ce"} color={"#FFFFFF"}>Editar Lembrete</ModalHeader>
        <ModalCloseButton color="#FFFFFF"/>
        <ModalBody>
          <FormControl isRequired id="dependenteId" mb={4}>
            <FormLabel>Dependente</FormLabel>
            <Select
              placeholder="Selecione um dependente"
              {...register("dependenteId", { required: true })}
            >
              {dependentes.map((dependente) => (
                <option key={dependente.id} value={dependente.id}>
                  {dependente.nome}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired id="tratamentoId" mb={4}>
            <FormLabel>Tratamento</FormLabel>
            <Select
              placeholder="Selecione um tratamento"
              {...register("tratamentoId", { required: true })}
              onChange={handleTratamentoChange}
            >
              {tratamentos.map((tratamento) => (
                <option key={tratamento.id} value={tratamento.id}>
                  {tratamento.nome}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl
            isRequired={typeTratament === "MEDICAMENTO" ?? true}
            id="unidade"
            mb={4}
          >
            <FormLabel>Unidade</FormLabel>
            <Select
              placeholder="Selecione a unidade de medica"
              {...register("unidade", {
                required: typeTratament === "MEDICAMENTO" ?? true,
              })}
            >
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
          <FormControl
            isRequired={typeTratament === "MEDICAMENTO" ?? true}
            id="dose"
            mb={4}
          >
            <FormLabel>
              Quantidade
            </FormLabel>
            <Input
              placeholder="Insira o numero de doses ou minutos"
              type="number"
              min={0}
              {...register("dose", {
                required: typeTratament === "MEDICAMENTO" ?? true,
              })}
            />
          </FormControl>
          <FormControl isRequired id="dias" mb={4}>
            <FormLabel>Dias</FormLabel>
            <CheckboxGroup defaultValue={initialData.dias}>
              <Stack direction="row" wrap="wrap">
                <Checkbox value="domingo" {...register("dias")}>
                  Domingo
                </Checkbox>
                <Checkbox value="segunda-feira" {...register("dias")}>
                  Segunda
                </Checkbox>
                <Checkbox value="terça-feira" {...register("dias")}>
                  Terça
                </Checkbox>
                <Checkbox value="quarta-feira" {...register("dias")}>
                  Quarta
                </Checkbox>
                <Checkbox value="quinta-feira" {...register("dias")}>
                  Quinta
                </Checkbox>
                <Checkbox value="sexta-feira" {...register("dias")}>
                  Sexta
                </Checkbox>
                <Checkbox value="sábado" {...register("dias")}>
                  Sábado
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
        <FormControl isRequired id="horarios" mb={4}>
            <FormLabel>Horários</FormLabel>
            {/* <Stack spacing={3}>
              {fields.map((field, index) => (
                <Input
                  key={field.id}
                  type="time"
                  {...register(`horarios.${index}.value`, { required: true })}
                />
              ))}
              <Button onClick={() => append({ value: "" })} mt={2}>
                Adicionar Horário
              </Button>
              {fields.length > 1 && (
                <Button onClick={() => remove(fields.length - 1)} mt={2}>
                  Remover Último Horário
                </Button>
              )}
            </Stack> */}
            <Stack spacing={3}>
              {fields.map((field, index) => (
                <Stack key={field.id} direction="row" alignItems="center">
                  <Input
                    type="time"
                    size="sm"
                    width='200px'
                    {...register(`horas.${index}.value`, { required: true })}
                  />
                  <Button
                    onClick={() => remove(index)}
                    colorScheme="red"
                variant="outline"
                    size="sm"
                rightIcon={<FaTrash fontSize={"16px"} />}

                  >
                    Remover
                  </Button>
                </Stack>
              ))}
              <Button onClick={() => append({ value: "" })} mt={2}>
                Adicionar Horário
              </Button>
            </Stack>
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

export default ReminderEditForm;
