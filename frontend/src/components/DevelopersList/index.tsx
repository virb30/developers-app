import { useState } from "react";
import { useDevelopers } from "../../hooks/useDevelopers";
import { EditDeveloperModal } from "../EditDeveloperModal";
import { NewDeveloperModal } from "../NewDeveloperModal";
import { DeveloperItem } from "./DeveloperItem";

import style from './style.module.scss';

interface Developer {
  id: number;
  name: string;
  gender: string;
  hobby: string;
  birthDate: string;
}

export function DevelopersList(){
  const {developers} = useDevelopers();
  const [isNewDeveloperModalOpen, setIsNewDeveloperModalOpen] = useState(false);
  const [isEditDeveloperModalOpen, setIsEditDeveloperModalOpen] = useState(false);
  const [edittingDeveloper, setEdittingDeveloper] = useState({} as Developer)

  function handleOpenNewDeveloperModal(){
    setIsNewDeveloperModalOpen(true);
  }

  function handleCloseNewDeveloperModal(){
    setIsNewDeveloperModalOpen(false);
  }

  function handleOpenEditDeveloperModal(developer: Developer){
    setEdittingDeveloper(developer);
    setIsEditDeveloperModalOpen(true);
  }

  function handleCloseEditDeveloperModal(){
    setEdittingDeveloper({} as Developer);
    setIsEditDeveloperModalOpen(false);
  }

  return (
    <div className={style.container}>
      <button type="button" onClick={handleOpenNewDeveloperModal} className={style.newDeveloperButton}>
        Novo desenvolvedor
      </button>
      <table className={style.list}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data de nascimento</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {developers.map(developer => (
            <DeveloperItem key={developer.id} developer={developer} onEdit={handleOpenEditDeveloperModal}/>
          ))}
        </tbody>
      </table>



      <NewDeveloperModal
        isOpen={isNewDeveloperModalOpen} 
        onRequestClose={handleCloseNewDeveloperModal}
      />
      <EditDeveloperModal
        isOpen={isEditDeveloperModalOpen} 
        onRequestClose={handleCloseEditDeveloperModal}
        developer={edittingDeveloper}
      />
    </div>
   );
}