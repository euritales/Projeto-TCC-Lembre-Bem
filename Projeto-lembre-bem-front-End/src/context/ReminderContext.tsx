"use client";

import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import api from "../api"; // Certifique-se de que o caminho está correto
import { useToast } from "@chakra-ui/react";
import { format,isSameMinute, parseISO ,differenceInMilliseconds} from "date-fns";
import { ptBR } from "date-fns/locale";

interface Horario {
  id: number;
  horaLembrete: string;
  status: boolean;
  horaAplicacao?: string | null;
}

interface Reminder {
  id: number;
  dependenteId: {
    id: number;
    nome: string;
  };
  tratamentoId: {
    id: number;
    nome: string;
    tipo?: string;
  };
  unidade: string;
  dose: number;
  dias: string[];
  horarios: Horario[];
}

interface ReminderContextProps {
  reminders: Reminder[];
  getReminders: () => Promise<void>;
  createReminder: (data: {
    dependenteId: number;
    tratamentoId: number;
    unidade: string;
    dose: number;
    dias: string[];
    horarios: { horaLembrete: string; status: boolean; horaAplicacao?: string | null; }[];
  }) => Promise<void>;
  updateReminder: (
    id: number,
    data: {
      dependenteId: number;
      tratamentoId: number;
      unidade: string;
      dose: number;
      dias: string[];
      horarios: { id: number; horaLembrete: string; status: boolean; horaAplicacao?: string | null; }[];
    }
  ) => Promise<void>;
  deleteReminder: (id: number) => Promise<void>;
  applyReminder: (id: number, hora: string) => Promise<void>; // Nova função adicionada
}

const ReminderContext = createContext<ReminderContextProps | undefined>(
  undefined
);

export const ReminderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [timeoutId, setTimeoutId] = useState<number | null>(null); 
  const toast = useToast();

  const getReminders = useCallback(async () => {
    try {
      const response = await api.get<Reminder[]>("/lembretes/all");
      if (response.status === 200) {
        setReminders(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  }, []);

  const createReminder = async (data: {
    dependenteId: number;
    tratamentoId: number;
    unidade: string;
    dose: number;
    dias: string[];
    horarios: { horaLembrete: string; status: boolean; horaAplicacao?: string | null; }[];
  }) => {
    try {
      const response = await api.post("/lembretes/cadastro", data);
      if (response.status === 201) {
        getReminders();
      }
    } catch (error) {
      console.error("Failed to create reminder:", error);
    }
  };

  const updateReminder = async (
    id: number,
    data: {
      dependenteId: number;
      tratamentoId: number;
      unidade: string;
      dose: number;
      dias: string[];
      horarios: { id: number; horaLembrete: string; status: boolean; horaAplicacao?: string | null; }[];
    }
  ) => {
    try {
      const response = await api.put(`/lembretes/${id}`, data);
      if (response.status === 204) {
        getReminders();
      }
    } catch (error) {
      console.error("Failed to update reminder:", error);
    }
  };

  const deleteReminder = async (id: number) => {
    try {
      const response = await api.delete(`/lembretes/${id}`);
      if (response.status === 204) {
        getReminders();
      }
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  const applyReminder = async (id: number, hora: string) => {
    try {
      const response = await api.put(`/lembretes/lembrete_realizado/${id}?hora=${hora}`);
      if (response.status === 204) {
        toast.closeAll();
        toast({
          title: "Lembrete confirmado!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        getReminders();
      }
    } catch (error) {
      toast({
        title: "Erro ao confirmar lembrete!",
        status: "error",
        description:"Quantidade insuficiente de medicamento",
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      
      console.error("Falha ao confirmar o lembrete", error);
    }
  };

//  ---------------------------------------
 // Função para verificar lembretes e emitir notificações
 const checkReminders = () => {
  const now = new Date();
  const today = format(now, "EEEE", { locale: ptBR });

  const todayReminders = reminders.filter((reminder) =>
    reminder.dias.includes(today)
  );

  const pendingReminders = todayReminders.flatMap((reminder) =>
    reminder.horarios
      .filter((horario) => !horario.status && isSameMinute(parseISO(`${format(now, 'yyyy-MM-dd')}T${horario.horaLembrete}`), now))
      .map((horario) => ({
        reminder,
        horario,
      }))
  );

  pendingReminders.forEach(({ reminder, horario }) => {
    toast({
      title: `Hora do Lembrete!`,
      description: `${reminder.tratamentoId.nome} \n para ${reminder.dependenteId.nome} \n às ${horario.horaLembrete.slice(0, 5)}`,
      status: "warning",
      variant:'left-accent',
      duration: null,
      isClosable: true,
      position: "top-right",
    });
  });
};

useEffect(() => {
  const intervalId = setInterval(checkReminders, 60000); // Verificar a cada 60 segundos

  // Verificação inicial ao montar o componente
  checkReminders();

  return () => clearInterval(intervalId);
}, [reminders]);
//  ---------------------------------------

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        getReminders,
        createReminder,
        updateReminder,
        deleteReminder,
        applyReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );

  
};

export const useReminder = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error(
      "useReminder deve ser usado dentro de um ReminderContextProvider"
    );
  }
  return context;
};
