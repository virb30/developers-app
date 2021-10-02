import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import React, { useState } from "react";
import { useDevelopers } from '../../hooks/useDevelopers';

import styles from './style.module.scss';

interface NewDeveloperModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}


export function NewDeveloperModal({isOpen, onRequestClose }: NewDeveloperModalProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [hobby, setHobby] = useState('');
  const [loading, setLoading] = useState(false);

  const { createDeveloper } = useDevelopers();


  const resetForm = () => {
    setName('');
    setBirthDate('');
    setGender('');
    setHobby('');
  }
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const data = {
      name,
      birth_date: birthDate,
      gender,
      hobby
    }

    try {
      setLoading(true);
      await createDeveloper(data);
      resetForm();
      onRequestClose();
    } finally {
      setLoading(false);
    }
  }
  
  return (<Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
  >
    <button type="button" onClick={onRequestClose} className="react-modal-close">
      <FaTimes />
    </button>
    <form onSubmit={handleSubmit} className={styles.developersForm}>
      <h2>Novo Desenvolvedor</h2>
      <div>
        <label htmlFor="name">Nome</label>
        <input 
          type="text" 
          id="name" 
          required 
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="birth_date">Data de Nascimento</label>
        <input 
          type="date" 
          id="birth_date" 
          required
          onChange={event => setBirthDate(event.target.value)}
          value={birthDate}
        />
      </div>
      <div>
        <label htmlFor="gender">Sexo</label>
        <select id="gender" required value={gender} onChange={(event) => setGender(event.target.value)}>
          <option value="">Selecione o Gênero</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <div>
        <label htmlFor="hobby">Hobby</label>
        <input 
          type="text" 
          id="hobby" 
          required 
          value={hobby}
          onChange={event => setHobby(event.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading? 'Enviando...': 'Enviar'}
      </button>
    </form>
    </Modal>
  )
}