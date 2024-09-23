"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  Input,
  Select,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { FaClipboardList } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useReminder } from "@/context/ReminderContext";
import HomeReminderCard from "@/components/cards/HomeReminderCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDependent, setSelectedDependent] = useState<string>("");
  const { reminders, getReminders } = useReminder();
  const [chartData, setChartData] = useState({
    labels: ["Aplicado", "Não Aplicado"],
    datasets: [
      {
        label: "% de Aplicação",
        data: [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getReminders();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleDependentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDependent(e.target.value);
  };

  const fetchReportData = () => {
    const filteredReminders = reminders.filter(
      (reminder) =>
        reminder.dependenteId.nome === selectedDependent &&
        reminder.dias.includes(
          new Date(selectedDate).toLocaleDateString("pt-BR", {
            weekday: "long",
          }).toLowerCase()
        )
    );

    // Aqui você pode calcular os dados do gráfico
    const totalReminders = filteredReminders.length;
    const completedReminders = filteredReminders.filter((reminder) =>
      reminder.horarios.some((horario) => horario.status)
    ).length;

    const chartData = {
      labels: ["Aplicado", "Não Aplicado"],
      datasets: [
        {
          label: "% de Aplicação",
          data: [completedReminders, totalReminders - completedReminders],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartData);
  };

  return (
    <>
      <Button
        leftIcon={<FaClipboardList color="white" fontSize="24px" />}
        color="white"
        variant='solid'
        onClick={onOpen}
        colorScheme="blue"

      >
        Relatório
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="#0582ca" color="white">
            Histórico de Tratamentos
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} mb={4}>
              <Input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                mb={4}
              />
              <Select
                placeholder="Selecione o Dependente"
                value={selectedDependent}
                onChange={handleDependentChange}
              >
                {/* Lista de dependentes deve ser renderizada aqui */}
              </Select>
              <Button onClick={fetchReportData} colorScheme="blue" mb={4}>
                Buscar Relatório
              </Button>
              {chartData.datasets[0].data.some((data: number) => data > 0) && (
                <Box mt={6} w="100%">
                  <Pie data={chartData} />
                </Box>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ReportDrawer;
