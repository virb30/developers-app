import { AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from '../services/api';

interface Developer {
  id: number,
  name: string,
  birthDate: string;
  hobby: string;
  gender: string;
  age: number;
}

interface DeveloperInput {
  name: string;
  birth_date: string;
  hobby: string;
  gender: string;
}

interface DevelopersProviderProps {
  children: ReactNode;
}

interface DevelopersContextData {
  developers: Developer[],
  createDeveloper: (developer: DeveloperInput) => Promise<void>;
  deleteDeveloper: (id: number) => Promise<void>;
  updateDeveloper: (id: number, data: DeveloperInput) => Promise<void>;
}


const DevelopersContext = createContext<DevelopersContextData>(
  {} as DevelopersContextData
);

export function DevelopersProvider({children}: DevelopersProviderProps){
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    api.get<{data: Developer[]}>('/developers')
      .then(response => setDevelopers(response.data.data))
  }, []);

  async function createDeveloper(developerInput: DeveloperInput) {
    const response = await api.post<DeveloperInput, AxiosResponse<Developer>>('/developers', {...developerInput });

    const developer = response.data;

    setDevelopers([...developers, developer]);
  }

  async function deleteDeveloper(id: number){

    await api.delete(`/developers/${id}`);

    setDevelopers(developers.filter(developer => developer.id !== id));
  }

  async function updateDeveloper(id: number, data: DeveloperInput){

    const response = await api.put<DeveloperInput, AxiosResponse<Developer>>(`/developers/${id}`, data);

    const updatedDeveloper = response.data;

    const newDevelopers = developers.map(developer => {
      if (developer.id === updatedDeveloper.id){
        return updatedDeveloper;
      }
      return developer
    });

    setDevelopers(newDevelopers);
  }


  return (
    <DevelopersContext.Provider value={{developers, createDeveloper, deleteDeveloper, updateDeveloper}}>
      {children}
    </DevelopersContext.Provider>
  )
}

export function useDevelopers(){
  const context = useContext(DevelopersContext);

  return context;
}