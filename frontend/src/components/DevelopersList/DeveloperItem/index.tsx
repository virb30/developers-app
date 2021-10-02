import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useDevelopers } from "../../../hooks/useDevelopers";
import {format, parseISO} from 'date-fns';

import styles from './style.module.scss';

interface Developer {
  id: number;
  name: string;
  gender: string;
  hobby: string;
  birthDate: string;
  age: number;
}

interface DeveloperItemProps {
  developer: Developer;
  onEdit: (developer: Developer) => void;
}

export function DeveloperItem ({ developer, onEdit}: DeveloperItemProps) {
  const [loading, setLoading] = useState(false);

  const { deleteDeveloper } = useDevelopers();

  const handleDeleteDeveloper = async () => {
    setLoading(true);
    await deleteDeveloper(developer.id);
  }

  const handleEditDeveloper = () => {
    onEdit(developer);
  }

  return (
    <tr key={developer.id} className={styles.item}>
      <td>{developer.name}</td>
      <td>{developer.gender}</td>
      <td>{developer.age} anos</td>
      <td>{developer.hobby}</td>
      <td>{format(parseISO(developer.birthDate), 'dd/MM/yyyy')}</td>
      <td>
        <button type="button" onClick={handleEditDeveloper} className={styles.btnWarning}>
          <FaPen />
        </button>
        <button type="button" onClick={handleDeleteDeveloper} disabled={loading} className={styles.btnDanger} >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}