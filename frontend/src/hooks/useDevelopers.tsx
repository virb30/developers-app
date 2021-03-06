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

interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface DevelopersMeta {
  current_page: number;
  last_page: number;
  total: number;
  links: PageLink[];
}

interface DevelopersResponse {
  data: Developer[],
  meta: DevelopersMeta
}

interface LoadDevelopersInput {
  q?: string;
  page?: number;
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
  developersMeta: DevelopersMeta,
  createDeveloper: (developer: DeveloperInput) => Promise<void>;
  deleteDeveloper: (id: number) => Promise<void>;
  updateDeveloper: (id: number, data: DeveloperInput) => Promise<void>;
  loadDevelopers: (params: LoadDevelopersInput) => Promise<void>;
}


const DevelopersContext = createContext<DevelopersContextData>(
  {} as DevelopersContextData
);

export function DevelopersProvider({children}: DevelopersProviderProps){
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [developersMeta, setDevelopersMeta] = useState<DevelopersMeta>({} as DevelopersMeta);

  useEffect(() => {
    loadDevelopers({});
  }, []);

  async function loadDevelopers(params: LoadDevelopersInput){
    const response = await api.get<DevelopersResponse>('/developers', { params });
    setDevelopers(response.data.data);
    setDevelopersMeta(response.data.meta)
  }

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
    <DevelopersContext.Provider value={{developers, developersMeta, loadDevelopers, createDeveloper, deleteDeveloper, updateDeveloper}}>
      {children}
    </DevelopersContext.Provider>
  )
}

export function useDevelopers(){
  const context = useContext(DevelopersContext);

  return context;
}