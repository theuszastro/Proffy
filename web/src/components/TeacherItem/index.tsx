import React, { useState, useEffect } from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  cost: number | string;
  subject: string;
  data: [{
    week_day: number;
    from: number;
    to: number;
  }],
  proffy: {
    id: number;
    whatsapp: string;
    bio: string;
    user: {
      id: number;
      nome: string; 
      sobrenome: string;
      email: string;
      photo: string;
    }
  }
}

interface TeacherItemProps {
  teacher: Teacher;
}

interface DataProps {
  week_day: number;
  from: number;
  to: number;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const proffy = teacher.proffy;
  const user = teacher.proffy.user;
 
  const repeat = [1, 2, 3, 4, 5, 6];

  const [Segunda, setSegunda] = useState(false);
  const [Terça, setTerça] = useState(false);
  const [Quarta, setQuarta] = useState(false);
  const [Quinta, setQuinta] = useState(false);
  const [Sexta, setSexta] = useState(false);

  const [FromOne, setFromOne] = useState('');
  const [ToOne, setToOne] = useState('');  
  const [FromTwo, setFromTwo] = useState('');
  const [ToTwo, setToTwo] = useState('');  
  const [FromThree, setFromThree] = useState('');
  const [ToThree, setToThree] = useState('');
  const [FromFour, setFromFour] = useState('');
  const [ToFour, setToFour] = useState('');  
  const [FromFive, setFromFive] = useState('');
  const [ToFive, setToFive] = useState('');

  function createNewConnection() {
    const data = {
      proffy_id: teacher.id
    }

    api.post('connections', data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.token}`
      }
    })
  }

  function compare(dia: number){
    const validate = teacher.data.map((item: DataProps) => item.week_day === dia);
  
    const Compared = validate.filter(item => item === true);

    if(Compared.length === 0){
      switch(dia){
        case 1:
          setSegunda(false);
          break;
        case 2:
          setTerça(false);
          break;
        case 3:
          setQuarta(false);
          break;
        case 4:
          setQuinta(false);
          break;
        case 5:
          setSexta(false);
          break;
      }

      return;
    }
      
    if(Compared[0]){
      switch(dia){
        case 1:
          setSegunda(true);
          break;
        case 2:
          setTerça(true);
          break;
        case 3:
          setQuarta(true);
          break;
        case 4:
          setQuinta(true);
          break;
        case 5:
          setSexta(true);
          break;
      }

      return;
    }
  }

  function convertToHours(From: number, To: number, day: number){
    const FromHora = Math.round(From / 60);
    const ToHora = Math.round(To / 60);
  
    // Não fiz os minutos pq ficou feio
    // Para fazer é: From % 60 = minutos

    switch (day) {
      case 1:
        setFromOne(`${FromHora}h`);
        setToOne(`${ToHora}h`);
        break;
      case 2:
        setFromTwo(`${FromHora}h`);
        setToTwo(`${ToHora}h`);
        break;
      case 3:
        setFromThree(`${FromHora}h`);
        setToThree(`${ToHora}h`);
        break;
      case 4:
        setFromFour(`${FromHora}h`);
        setToFour(`${ToHora}h`);
        break;
      case 5:
        setFromFive(`${FromHora}h`);
        setToFive(`${ToHora}h`);
        break;
    }
  }

  useEffect(() => {
    const data = teacher.data;

    repeat.map(item => compare(item));

    teacher.data.map((item, index) => {
      const data = teacher.data[index];

      convertToHours(data.from, data.to, data.week_day);
    })
  }, []);

  return (
    <article className="teacher-item">
      <header>
        <img src={user.photo} />
        <div>
          <strong>{`${user.nome} ${user.sobrenome}`}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{proffy.bio}</p>

      <div className="hours">
        <div className="hours-container">
          <div className={Segunda? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Segunda</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Segunda? `${FromOne} - ${ToOne}`: '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Terça? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Terça</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Terça? `${FromTwo} - ${ToTwo}`: '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Quarta? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Quarta</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Quarta? `${FromThree} - ${ToThree}`: '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Quinta? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Quinta</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Quinta? `${FromFour} - ${ToFour}`: '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Sexta? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Sexta</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Sexta? `${FromFive} - ${ToFive}`: '00h - 00h'}</h1> 
            </div>
          </div>
        </div>
      </div>


      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a 
          target="_blank" 
          onClick={createNewConnection} 
          href={`https://wa.me/${proffy.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;
