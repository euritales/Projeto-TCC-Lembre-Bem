
"use client";

import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import api from "../api";

interface Treatment {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  tipo: string; // "MEDICAMENTO" ou "ATIVIDADE"
}

interface TreatmentContextProps {
  tratamentos: Treatment[];
  getTratamentos: () => Promise<void>;
  createTratamento: (data: Omit<Treatment, "id">) => Promise<void>;
  updateTratamento: (id: number, data: Omit<Treatment, "id">) => Promise<void>;
  deleteTratamento: (id: number) => Promise<void>;
}

const TreatmentContext = createContext<TreatmentContextProps | undefined>(undefined);

export const TreatmentContextProvider = ({ children }: { children: ReactNode }) => {
  const [tratamentos, setTratamentos] = useState<Treatment[]>([]);
  const toast = useToast();

  async function getTratamentos() {
    try {
      const response = await api.get<Treatment[]>("/tratamentos/all");
      if (response.status === 200) {
        setTratamentos(response.data);
       
      }
    } catch (error) {
     
      console.error("Failed to fetch treatments:", error);
    }
  }

  async function createTratamento(data: Omit<Treatment, "id">) {
    try {
      const response = await api.post("/tratamentos/cadastro", data);
      if (response.status === 201) {
        getTratamentos();
       
      }
    } catch (error) {
     
      console.error("Failed to create treatment:", error);
    }
  }

  async function updateTratamento(id: number, data: Omit<Treatment, "id">) {
    try {
      const response = await api.put(`/tratamentos/${id}`, data);
      if (response.status === 204) {
        getTratamentos();
       
      }
    } catch (error) {
     
      console.error("Failed to update treatment:", error);
    }
  }

  async function deleteTratamento(id: number) {
    try {
      const response = await api.delete(`/tratamentos/${id}`);
      if (response.status === 204) {
        getTratamentos();
       
      }
    } catch (error) {
     
      console.error("Failed to delete treatment:", error);
    }
  }

  useEffect(() => {
    getTratamentos();
  }, []);

  return (
    <TreatmentContext.Provider
      value={{
        tratamentos,
        getTratamentos,
        createTratamento,
        updateTratamento,
        deleteTratamento,
      }}
    >
      {children}
    </TreatmentContext.Provider>
  );
};

export const useTreatment = () => {
  const context = useContext(TreatmentContext);
  if (!context) {
    throw new Error("useTreatment deve ser usado dentro de um TreatmentContextProvider");
  }
  return context;
};
