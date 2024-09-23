"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Select,
  Flex,
  Button,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import HomeReminderCard from "@/components/cards/HomeReminderCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useReminder } from "@/context/ReminderContext";
import { useToast } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";

const HomePage = () => {
  const { reminders, getReminders, applyReminder } = useReminder(); // Substituir updateReminder por applyReminder
  const [selectedDependent, setSelectedDependent] =
    useState("Todos os Lembretes");
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getReminders();
  }, []);

  const toggleStatus = async (reminderId: number, horarioId: number) => {
    const reminderToUpdate = reminders.find((r) => r.id === reminderId);
    if (!reminderToUpdate) {
        return;
    }

    const horario = reminderToUpdate.horarios.find((h) => h.id === horarioId);
    if (!horario) {
        return;
    }
    await applyReminder(reminderId, horario.horaLembrete);

    // toast({
    //   title: "Lembrete confirmado!",
    //   status: "success",
    //   duration: 5000,
    //   isClosable: true,
    //   position: 'top-right',
    // });
    
    await getReminders();
};

  const today = format(new Date(), "EEEE", { locale: ptBR });
  const todayReminders = reminders.filter((reminder) =>
    reminder.dias.includes(today)
  );

  const filteredReminders =
    selectedDependent === "Todos os Lembretes"
      ? todayReminders
      : todayReminders.filter(
          (reminder) => reminder.dependenteId.nome === selectedDependent
        );

  const sortedReminders = filteredReminders
    .flatMap((reminder) =>
      reminder.horarios.map((horario) => ({ ...reminder, horario }))
    )
    .sort((a, b) =>
      a.horario.horaLembrete.localeCompare(b.horario.horaLembrete)
    );

  const displayReminders = showOnlyPending
    ? sortedReminders.filter((reminder) => !reminder.horario.status)
    : sortedReminders;

  const uniqueDependents = Array.from(
    new Set(reminders.map((reminder) => reminder.dependenteId.nome))
  );

  const todayFormatted = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  return (
    <Container maxW="container.lg" py={6}>
      <Flex mb={4} alignItems={"center"}>
        <FaTasks color="#4a5568" fontSize="24px" />
        <Heading px={2} color="gray.600" as="h1" size="xl">
          Lembretes de Hoje
        </Heading>
      </Flex>

      <Flex mb={4}>
        <Select
          variant="filled"
          fontWeight={"bold"}
          flex="1"
          value={selectedDependent}
          onChange={(e) => setSelectedDependent(e.target.value)}
        >
          <option value="Todos os Lembretes">Todos os Dependentes</option>
          {uniqueDependents.map((dependent, index) => (
            <option key={index} value={dependent}>
              {dependent}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex mb={2} textAlign="center">
        <Text fontWeight={"bold"} fontSize="14px">
          {" "}
          Apenas Lembretes pendentes
        </Text>
        <Checkbox
          marginX={2}
          isChecked={showOnlyPending}
          onChange={(e) => setShowOnlyPending(e.target.checked)}
        ></Checkbox>
      </Flex>
      <Box
        bg="#eff1f3"
        h="55vh"
        overflowY="auto"
        p={2}
        borderWidth="1px"
        borderRadius="lg"
      >
        {displayReminders?.length > 0 ? (
          displayReminders.map((reminder, index) => (
            <HomeReminderCard
              key={`${reminder.id}-${reminder.horario.id}`}
              id={reminder.id}
              dependentName={reminder.dependenteId.nome}
              reminderTime={reminder.horario.horaLembrete.slice(0, 5)}
              treatmentName={reminder.tratamentoId.nome}
              treatmentType={reminder.tratamentoId.tipo || ""}
              dose={reminder.dose}
              unit={reminder.unidade}
              days={reminder.dias || []}
              status={reminder.horario.status}
              onToggleStatus={() =>
                toggleStatus(reminder.id, reminder.horario.id)
              }
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
              src="/assets/home-empty.png"
              alt="Sem lembretes"
              boxSize="150px"
              marginBottom={4}
            />
            <Text fontSize="lg" color="gray.500">
              Não há Lembretes para hoje
            </Text>
          </Flex>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;



// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   Select,
//   Flex,
//   Button,
//   Checkbox,
//   Image,
// } from "@chakra-ui/react";
// import HomeReminderCard from "@/components/cards/HomeReminderCard";
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";
// import { useReminder } from "@/context/ReminderContext";
// import { useToast } from "@chakra-ui/react";
// import { FaTasks } from "react-icons/fa";

// const HomePage = () => {
//   const { reminders, getReminders, updateReminder } = useReminder();
//   const [selectedDependent, setSelectedDependent] =
//     useState("Todos os Lembretes");
//   const [showOnlyPending, setShowOnlyPending] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     getReminders();
//   }, []);

//   const toggleStatus = async (reminderId: number, horarioId: number) => {
//     const reminderToUpdate = reminders.find((r) => r.id === reminderId);
//     if (!reminderToUpdate) return;

//     const updatedHorarios = reminderToUpdate.horarios.map((horario) => {
//       if (horario.id === horarioId) {
//         return {
//           ...horario,
//           status: true,
//           horaAplicacao: format(new Date(), "HH:mm:ss"),
//         };
//       }
//       return horario;
//     });

//     const updatedReminder = {
//       dependenteId: reminderToUpdate.dependenteId.id,
//       tratamentoId: reminderToUpdate.tratamentoId.id,
//       unidade: reminderToUpdate.unidade,
//       dose: reminderToUpdate.dose,
//       dias: reminderToUpdate.dias,
//       horarios: updatedHorarios,
//     };

//     await updateReminder(reminderId, updatedReminder);

//     toast({
//       title: "Lembrete confirmado!",
//       status: "success",
//       duration: 5000,
//       isClosable: true,
//       position:'top-right',

//     });
//   };

//   const today = format(new Date(), "EEEE", { locale: ptBR });
//   const todayReminders = reminders.filter((reminder) =>
//     reminder.dias.includes(today)
//   );

//   const filteredReminders =
//     selectedDependent === "Todos os Lembretes"
//       ? todayReminders
//       : todayReminders.filter(
//           (reminder) => reminder.dependenteId.nome === selectedDependent
//         );

//   const sortedReminders = filteredReminders
//     .flatMap((reminder) =>
//       reminder.horarios.map((horario) => ({ ...reminder, horario }))
//     )
//     .sort((a, b) =>
//       a.horario.horaLembrete.localeCompare(b.horario.horaLembrete)
//     );

//   const displayReminders = showOnlyPending
//     ? sortedReminders.filter((reminder) => !reminder.horario.status)
//     : sortedReminders;

//   const uniqueDependents = Array.from(
//     new Set(reminders.map((reminder) => reminder.dependenteId.nome))
//   );

//   const todayFormatted = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
//     locale: ptBR,
//   });

//   return (
//     <Container maxW="container.lg" py={6}>
//       <Flex mb={4} alignItems={"center"}>
//         <FaTasks color="#4a5568" fontSize="24px" />
//         <Heading px={2} color="gray.600" as="h1" size="xl">
//           Lembretes de Hoje
//         </Heading>
//       </Flex>

//       {/* <Text fontWeight={"bold"} fontSize="14px" mb={6}>
//         {todayFormatted}
//       </Text> */}
//       <Flex mb={4}>
//         <Select
//           variant="filled"
//           fontWeight={"bold"}
//           flex="1"
//           value={selectedDependent}
//           onChange={(e) => setSelectedDependent(e.target.value)}
//         >
//           <option value="Todos os Lembretes">Todos os Dependentes</option>
//           {uniqueDependents.map((dependent, index) => (
//             <option key={index} value={dependent}>
//               {dependent}
//             </option>
//           ))}
//         </Select>
//         {/* <Button 
//         colorScheme="teal"
//         ml={4} onClick={() => setShowOnlyPending(!showOnlyPending)}>
//           {showOnlyPending ? "Mostrar Todos" : "Mostrar Pendentes"}
//         </Button> */}
//       </Flex>
//       <Flex mb={2} textAlign="center">
//         <Text fontWeight={"bold"} fontSize="14px">
//           {" "}
//           Apenas Lembretes pendentes
//         </Text>
//         <Checkbox
//           marginX={2}
//           isChecked={showOnlyPending}
//           onChange={(e) => setShowOnlyPending(e.target.checked)}
//         ></Checkbox>
//       </Flex>
//       <Box
//         bg="#eff1f3"
//         h="55vh"
//         overflowY="auto"
//         p={2}
//         borderWidth="1px"
//         borderRadius="lg"
//       >
//         {displayReminders?.length > 0 ? (
//           displayReminders.map((reminder, index) => (
//             <HomeReminderCard
//               key={`${reminder.id}-${reminder.horario.id}`}
//               id={reminder.id}
//               dependentName={reminder.dependenteId.nome}
//               reminderTime={reminder.horario.horaLembrete.slice(0, 5)}
//               treatmentName={reminder.tratamentoId.nome}
//               treatmentType={reminder.tratamentoId.tipo || ""}
//               dose={reminder.dose}
//               unit={reminder.unidade}
//               days={reminder.dias || []}
//               status={reminder.horario.status}
//               onToggleStatus={() =>
//                 toggleStatus(reminder.id, reminder.horario.id)
//               }
//             />
//           ))
//         ) : (
//           <Flex
//             backgroundColor={"white"}
//             direction={"column"}
//             height={"100%"}
//             justifyContent={"center"}
//             alignItems="center"
//             textAlign="center"
//           >
//             <Image
//               src="/assets/home-empty.png"
//               alt="Sem lembretes"
//               boxSize="150px"
//               marginBottom={4}
//             />
//             <Text fontSize="lg" color="gray.500">
//               Não há Lembretes para hoje
//             </Text>
//           </Flex>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default HomePage;
