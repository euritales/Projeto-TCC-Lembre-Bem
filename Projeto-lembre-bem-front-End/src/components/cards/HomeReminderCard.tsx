import { Box, Text, Flex, Badge, Button } from "@chakra-ui/react";
import {
  FaPills,
  FaClock,
  FaRunning,
  FaUserClock,
  FaCheckCircle,
  FaTablets,
  FaStopwatch,
  FaBell,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  parseISO,
  format,
  isBefore,
  isAfter,
  subMinutes,
  addMinutes,
} from "date-fns";

interface HomeReminderCardProps {
  id: number;
  dependentName: string;
  reminderTime: string;
  treatmentName: string;
  treatmentType: string;
  dose: number;
  unit: string;
  days: string[];
  status: boolean;
  onToggleStatus: () => void;
}

const HomeReminderCard: React.FC<HomeReminderCardProps> = ({
  id,
  dependentName,
  reminderTime,
  treatmentName,
  treatmentType,
  dose,
  unit,
  days,
  status,
  onToggleStatus,
}) => {
  const [timeStatus, setTimeStatus] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const updateTimeStatus = () => {
    const now = new Date();
    console.log("Atualizando status com base no horário atual:", now); // Log para verificar o horário
    const reminderDate = parseISO(
      `${format(now, "yyyy-MM-dd")}T${reminderTime}`
    );
    const timeBeforeReminder = subMinutes(reminderDate, 30);
    const timeAfterReminder = addMinutes(reminderDate, 5);

    if (status) {
      setTimeStatus("Feito");
    } else if (
      isBefore(now, reminderDate) &&
      isAfter(now, timeBeforeReminder)
    ) {
      setTimeStatus("Próximo");
    } else if (isAfter(now, reminderDate) && isBefore(now, timeAfterReminder)) {
      setTimeStatus("Agora");
    } else if (isAfter(now, timeAfterReminder)) {
      setTimeStatus("Atrasado");
    } else {
      setTimeStatus("Pendente");
    }
  };

  useEffect(() => {
    console.log("useEffect executado"); // Log para quando o useEffect é chamado
    updateTimeStatus(); // Inicializar o status ao montar o componente

    const intervalId = setInterval(() => {
      setCurrentTime(new Date()); // Atualiza o estado atual
    }, 60000); // Atualizar a cada minuto

    return () => {
      console.log("Intervalo limpo"); // Log para quando o intervalo é limpo
      clearInterval(intervalId); // Limpar intervalo ao desmontar
    };
  }, []);

  useEffect(() => {
    updateTimeStatus(); // Chama a função sempre que reminderTime, status ou currentTime mudarem
    console.log("Status do lembrete atualizado");
  }, [reminderTime, status, currentTime]); // Adiciona currentTime para forçar a reavaliação

  const getBadgeColorScheme = (status: string) => {
    switch (status) {
      case "Atrasado":
        return "red";
      case "Agora":
        return "orange";
      case "Próximo":
        return "blue";
      case "Feito":
        return "green";
      default:
        return "gray"; // Para status "Pendente" ou outros não especificados
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
      <Box bg="#006494" p={2} color="white" height={"60px"}>
        <Flex alignItems="start" justifyContent="space-between">
          <Flex flexDir={"column"} alignItems="start">
            <Flex>
              <FaUserClock fontSize="16px" />
              <Text ml={2} fontWeight="bold" fontSize="sm">
                {dependentName}
              </Text>
            </Flex>
            <Flex>
              {treatmentType === "MEDICAMENTO" ? (
                <FaPills fontSize="16px" />
              ) : (
                <FaRunning fontSize="16px" />
              )}
              <Text ml={2} fontWeight="bold" fontSize="sm">
                {treatmentName}
              </Text>
            </Flex>
          </Flex>
          <Flex mt={1}>
            <Badge
              colorScheme={treatmentType === "MEDICAMENTO" ? "green" : "blue"}
            >
              {treatmentType}
            </Badge>
          </Flex>
        </Flex>
      </Box>
      <Box bg="#ffffff" px={4} py={1}>
        <Flex
          display={"flex"}
          flexDir={"column"}
          bg={"#edf2f7"}
          justifyContent={"space-between"}
        >
          <Flex bg={"#edf2f7"} py={1} alignItems="center">
            <FaClock fontSize="12px" style={{ marginRight: "8px" }} />
            <Badge
              fontSize="12px"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              color="black"
            >
              <strong>Horário:</strong> {reminderTime}
            </Badge>
          </Flex>
          {timeStatus ? (
            <Flex bg={"#edf2f7"} py={1} alignItems="center">
              <FaBell fontSize="12px" style={{ marginRight: "6px" }} />
              <Badge
                fontSize="11px"
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                variant="subtle"
                colorScheme={getBadgeColorScheme(timeStatus)}
              >
                <strong>Status:</strong> {timeStatus}
              </Badge>
            </Flex>
          ) : (
            <Flex bg={"#edf2f7"} py={1} alignItems="center">
              <FaBell fontSize="12px" style={{ marginRight: "6px" }} />
              <Badge
                fontSize="11px"
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                variant="subtle"
                colorScheme="green"
              >
                <strong>Status:</strong> Feito
              </Badge>
            </Flex>
          )}
        </Flex>
        <Flex bg={"#edf2f7"} py={1} alignItems="center">
          {treatmentType === "MEDICAMENTO" ? (
            <FaPills
              fontSize="14px"
              style={{ marginRight: "6px" }}
              color="black"
            />
          ) : (
            <FaRunning
              fontSize="14px"
              style={{ marginRight: "6px" }}
              color="black"
            />
          )}
          <Badge
            fontSize="12px"
            whiteSpace="pre-wrap"
            wordBreak="break-word"
            color="black"
          >
            <strong>
              {treatmentType === "MEDICAMENTO" ? "Medicação:" : "Atividade:"}
            </strong>{" "}
            {treatmentName}
          </Badge>
        </Flex>
        <Flex bg={"#edf2f7"} py={1} alignItems="center">
          {treatmentType === "MEDICAMENTO" ? (
            <FaTablets
              fontSize="14px"
              style={{ marginRight: "6px" }}
              color="black"
            />
          ) : (
            <FaStopwatch
              fontSize="14px"
              style={{ marginRight: "6px" }}
              color="black"
            />
          )}
          <Badge
            fontSize="12px"
            whiteSpace="pre-wrap"
            wordBreak="break-word"
            color="black"
          >
            <strong>{unit}:</strong> {dose}
          </Badge>
        </Flex>
        <Flex marginTop={2} >
          {!status && (
            <Button
              borderWidth="1px"
              marginBottom={1}
              borderColor={"gray"}
              borderRadius={4}
              variant="solid"
              w={'100%'}
              size="xs"
              colorScheme="blue"
              // _hover={{ bg: "#003554" }}
              color="white"
              onClick={() => {
                console.log("onToggleStatus chamado para:", id);
                onToggleStatus();
              }}
              fontSize="14px"
              rightIcon={<FaCheckCircle />}
            >
              {"Confirmar Lembrete"}
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default HomeReminderCard;
