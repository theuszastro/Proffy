import React, { useState, useEffect } from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  cost: number | string;
  subject: string;
  data: [{
    week_day: string;
    from: string;
    to: string;
    class_id: number;
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

interface TeacherProps {
  teacher: Teacher;
}
const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {
  const proffy = teacher.proffy;
  const user = teacher.proffy.user;
 
  const repeat = [1, 2, 3, 4, 5, 6];

  const [Segunda, setSegunda] = useState(false);
  const [Terca, setTerca] = useState(false);
  const [Quarta, setQuarta] = useState(false);
  const [Quinta, setQuinta] = useState(false);
  const [Sexta, setSexta] = useState(false);
  
  const [SegundaLabel, setSegundaLabel] = useState('');
  const [TercaLabel, setTercaLabel] = useState('');
  const [QuartaLabel, setQuartaLabel] = useState('');
  const [QuintaLabel, setQuintaLabel] = useState('');
  const [SextaLabel, setSextaLabel] = useState('');

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

  useEffect(() => {
    teacher.data.map((item) => {
      switch(item.week_day){
        case 'Segunda-Feira': 
          setSegundaLabel(`${item.from} - ${item.to}`);
          setSegunda(true);
          break;
        case 'Terça-Feira': 
          setTercaLabel(`${item.from} - ${item.to}`);
          setTerca(true);
          break;
        case 'Quarta-Feira': 
          setQuartaLabel(`${item.from} - ${item.to}`);
          setQuarta(true);
          break;
        case 'Quinta-Feira': 
          setQuintaLabel(`${item.from} - ${item.to}`);
          setQuinta(true);
          break;
        case 'Sexta-Feira': 
          setSextaLabel(`${item.from} - ${item.to}`);
          setSexta(true);
          break;
      }
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

              <h1 className="card-title">{Segunda? SegundaLabel : '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Terca? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Terça</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Terca? TercaLabel : '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Quarta? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Quarta</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Quarta? QuartaLabel : '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Quinta? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Quinta</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Quinta? QuintaLabel : '00h - 00h'}</h1> 
            </div>
          </div>

          <div className={Sexta? 'card' : 'card desactive'}>
            <div className="card-data">
              <p className="card-label">Dia</p>

              <h1 className="card-title">Sexta</h1>
            </div>

            <div className="card-data">
              <p className="card-label">Horário</p>

              <h1 className="card-title">{Sexta? SextaLabel : '00h - 00h'}</h1> 
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
