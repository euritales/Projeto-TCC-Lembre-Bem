"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import api from "../api"; // Certifique-se de que o caminho está correto

interface Dependent {
  id: number;
  nome: string;
  dataNascimento: string;
  peso: string;
  comorbidade: string[];
  observacao: string;
}

interface DependentContextProps {
  dependentes: Dependent[];
  getDependents: () => Promise<void>;
  createDependent: (data: Omit<Dependent, "id">) => Promise<void>;
  updateDependent: (id: number, data: Omit<Dependent, "id">) => Promise<void>;
  deleteDependent: (id: number) => Promise<void>;
}

const DependentContext = createContext<DependentContextProps | undefined>(undefined);

export const DependentContextProvider = ({ children }: { children: ReactNode }) => {
  const [dependentes, setDependentes] = useState<Dependent[]>([]);

  async function getDependents() {
    try {
      const response = await api.get<Dependent[]>("/dependentes/all");
      if (response.status === 200) {
        setDependentes(response.data);
        console.log(dependentes);
      }
    } catch (error) {
      console.error("Failed to fetch dependents:", error);
    }
  }

  async function createDependent(data: Omit<Dependent, "id">) {
    try {
      const response = await api.post("/dependentes/cadastro", data);
      if (response.status === 201) {
        getDependents();
      }
    } catch (error) {
      console.error("Failed to create dependent:", error);
    }
  }

  async function updateDependent(id: number, data: Omit<Dependent, "id">) {
    try {
      const response = await api.put(`/dependentes/${id}`, data);
      if (response.status === 204) {
        getDependents();
      }
    } catch (error) {
      console.error("Failed to update dependent:", error);
    }
  }

  async function deleteDependent(id: number) {
    try {
      const response = await api.delete(`/dependentes/${id}`);
      if (response.status === 204) {
        getDependents();
      }
    } catch (error) {
      console.error("Failed to delete dependent:", error);
    }
  }

  return (
    <DependentContext.Provider
      value={{
        dependentes,
        getDependents,
        createDependent,
        updateDependent,
        deleteDependent,
      }}
    >
      {children}
    </DependentContext.Provider>
  );
};

export const useDependente = () => {
  const context = useContext(DependentContext);
  if (!context) {
    throw new Error("useDependente deve ser usado dentro de um DependentContextProvider");
  }
  return context;
};
