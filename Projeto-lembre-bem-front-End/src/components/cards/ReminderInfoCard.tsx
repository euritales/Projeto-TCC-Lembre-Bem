import { Box, Text, Badge, Flex } from "@chakra-ui/react";
import { FaClock, FaUser, FaPills, FaRunning } from "react-icons/fa";

interface ReminderInfoCardProps {
  dependentName: string;
  reminderTime: string;
  treatmentName: string;
  treatmentType: string;
}

const ReminderInfoCard: React.FC<ReminderInfoCardProps> = ({
  dependentName,
  reminderTime,
  treatmentName,
  treatmentType,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      borderColor={"black"}
      overflow="hidden"
      mb={4}
      p={4}
      boxShadow="md"
    >
      <Flex direction="column" justifyContent="space-between" alignItems="start">
        <Flex alignItems="center" mb={2}>
          <FaUser fontSize="20px" color={"black"} />
          <Text ml={2} fontWeight="bold" fontSize="lg">
            {dependentName}
          </Text>
        </Flex>
        <Flex alignItems="center" mb={2}>
          <FaClock style={{ marginRight: "8px" }} />
          <Badge fontSize={"sm"} whiteSpace="pre-wrap" wordBreak="break-word" color={"black"}>
            <strong>Horário:</strong> {reminderTime}
          </Badge>
        </Flex>
        <Flex alignItems="center" mb={2}>
          {treatmentType === "MEDICAMENTO" ? (
            <FaPills style={{ marginRight: "8px" }} />
          ) : (
            <FaRunning style={{ marginRight: "8px" }} />
          )}
          <Badge fontSize={"sm"} whiteSpace="pre-wrap" wordBreak="break-word" color={"black"}>
            <strong>{treatmentType === "MEDICAMENTO" ? "Medicação:" : "Atividade:"}</strong> {treatmentName}
          </Badge>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ReminderInfoCard;
