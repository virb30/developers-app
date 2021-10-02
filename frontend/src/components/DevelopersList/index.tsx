import React, { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
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
  const {developers, developersMeta, loadDevelopers} = useDevelopers();
  const [isNewDeveloperModalOpen, setIsNewDeveloperModalOpen] = useState(false);
  const [isEditDeveloperModalOpen, setIsEditDeveloperModalOpen] = useState(false);
  const [edittingDeveloper, setEdittingDeveloper] = useState({} as Developer)
  const [search, setSearch] = useState('');

  const { current_page, last_page} = developersMeta;

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

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    try {
      await loadDevelopers({ q: search });
    } catch(err: any){
      if (err.response.status === 404){
        alert(err.response.data.error)
      } else {
        console.error(err);
      }
    }
  }
  
  function handleNextPage() {
    handleJumpTo(current_page + 1)
  }

  function handlePrevPage() {
    handleJumpTo(current_page - 1);
  }

  function handleJumpTo(page = 1) {

    if(page <= last_page && page >= 1){
      loadDevelopers({ page });
    }
  }

  const pages = useMemo(() => {
    return Array.from(Array(last_page).keys());
  }, []);

  return (
    <div className={style.container}>
      <button type="button" onClick={handleOpenNewDeveloperModal} className={style.newDeveloperButton}>
        Novo desenvolvedor
      </button>
      <form onSubmit={handleSearch} className={style.searchContainer}>
        <input type="search" onChange={(event) => setSearch(event.target.value)} placeholder="Busca" />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
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
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className={style.pagination}>
                <button type="button" onClick={handlePrevPage} disabled={current_page <= 1}>
                  <FaChevronLeft />
                </button>
                {pages.map(page => (
                  <button key={page} type="button" onClick={() => handleJumpTo(page + 1)} 
                    disabled={current_page === page + 1}
                    className={current_page === page + 1? style.active: ''}>
                    {page + 1}
                  </button>
                ))}
                <button type="button" onClick={handleNextPage} disabled={current_page === developersMeta.last_page}>
                  <FaChevronRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
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