// src/components/forms/DependentForm.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useDependente } from "@/context/DependentContext";

interface DependentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  nome: string;
  dataNascimento: string;
  peso: string;
  comorbidade: string;
  observacao: string;
}

const DependentForm: React.FC<DependentFormProps> = ({ isOpen, onClose }) => {
  const { createDependent } = useDependente();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("entrou");
    const { nome, dataNascimento, peso, comorbidade, observacao } = data;
    try {
      await createDependent({
        nome,
        dataNascimento,
        peso,
        comorbidade: comorbidade.split(",").map((c) => c.trim()),
        observacao,
      });
      toast({
        title: "Dependente criado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position:'top-right',

      });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao criar dependente",
        status: "error",
        duration: 5000,
        isClosable: true,
        position:'bottom-right',

      });
      console.error("Failed to create dependent:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor={"#3182ce"} color={"#FFFFFF"}>Cadastrar Dependente</ModalHeader>
        <ModalCloseButton color="#FFFFFF" />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
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
                <FormLabel>Observação</FormLabel>
                <Input {...register("observacao")} />
              </FormControl>
            </VStack>
            <Flex mt={8} justifyContent={"flex-end"}>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" type="submit">
                Cadastrar
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DependentForm;


// // src/components/forms/DependentForm.tsx

// import { useForm, SubmitHandler } from "react-hook-form";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import { useDependente } from "@/context/DependentContext";

// interface DependentFormProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface FormValues {
//   nome: string;
//   dataNascimento: string;
//   peso: string;
//   comorbidade: string;
//   observacao: string;
// }

// const DependentForm: React.FC<DependentFormProps> = ({ isOpen, onClose }) => {
//   const { createDependent } = useDependente();
//   const { register, handleSubmit, reset } = useForm<FormValues>();
//   const toast = useToast();

//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     console.log("entrou")
//     const { nome, dataNascimento, peso, comorbidade, observacao } = data;
//     try {
//       await createDependent({
//         nome,
//         dataNascimento,
//         peso,
//         comorbidade: comorbidade.split(",").map((c) => c.trim()),
//         observacao,
//       });
//       toast({
//         title: "Dependente criardo com sucesso!",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       reset();
//       onClose();
//     } catch (error) {
//       toast({
//         title: "Erro ao criar dependente",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//       console.error("Failed to create dependent:", error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader backgroundColor={"#3182ce"} color={"#FFFFFF"}>Cadastrar Dependente</ModalHeader>
//         <ModalCloseButton color="#FFFFFF"/>
//         <ModalBody>
//           <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
//             <FormControl isRequired>
//               <FormLabel>Nome</FormLabel>
//               <Input {...register("nome", { required: true })} />
//             </FormControl>
//             <FormControl isRequired>
//               <FormLabel>Data de Nascimento</FormLabel>
//               <Input
//                 type="date"
//                 {...register("dataNascimento", { required: true })}
//               />
//             </FormControl>
//             <FormControl isRequired>
//               <FormLabel>Peso</FormLabel>
//               <Input {...register("peso", { required: true })} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Comorbidades (separadas por vírgulas)</FormLabel>
//               <Input {...register("comorbidade")} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Observação</FormLabel>
//               <Input {...register("observacao")} />
//             </FormControl>
//           </VStack>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="gray" mr={3} onClick={onClose}>
//             Cancelar
//           </Button>
//           <Button type="submit" colorScheme="blue">
//             Cadastrar
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default DependentForm;
