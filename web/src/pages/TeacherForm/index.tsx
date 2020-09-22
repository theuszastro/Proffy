import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { useProfile } from '../../context';

import Header from '../../components/header';
import Select from '../../components/select';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import ProffySuccess from '../../components/ProffySuccess';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import { hoursOptions } from '../TeacherList';

import './styles.css';

function TeacherForm() {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const { User, setUser } = useProfile();

  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [success, setSuccess] = useState(false);

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    
    const data = {
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }

    api.post('/classes', data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
    }).then(() => {
      setSuccess(true);
    }).catch((error) => {
      console.log(error);

      alert('Erro no cadastro!');
    })
  }

  const getUser = async (id: number) => {
    const UserFind = await api.get(`/user/${id}`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      return response.data.User[0];  
    })
    .catch(err => console.log(err));

    setUser(UserFind);
  }

  const UserSet = async () => {
    if(!token)
      history.push('/login');

    const id = await api.get('/auth', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      return response.data.id;
    })
    .catch(err => history.push('/login')); 

    getUser(id); 
  }

  useEffect(() => {
    if(!User)
      UserSet();
  }, []);

  return (
    <>
      <div id="page-teacher-form" className={success? 'container hide' : 'container'}>
        <Header 
          title="Que incrível que você | quer dar aulas."
          description="O primeiro passo, é preencher esse | Formulario de inscrição."
          label="Prepare-se! | vai ser o máximo!"
          section="Dar aulas"
          icon="rocket"
          isClass={true}
        />

        <main>
          <form onSubmit={handleCreateClass}>
            <fieldset>
              <legend>Seus dados</legend>
              
              <div className="profile-form">
                <div className="profile-detail-form">
                  <img src={User && User.photo} className="profile-photo-form" />

                  <div className={!User? 'form-empty' : ''}>
                    <p className="profile-nome-form">{User && `${User.nome} ${User.sobrenome}`}</p>
                  </div>
                </div>

                <div className="whatsapp-input">
                  <Input 
                    name="whatsapp" 
                    label="WhatsApp"
                    maxLength={14}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>
              
              <Textarea 
                name="bio" 
                label="Biografia"
                value={bio}
                alert="(Maxímo 300 caracteres)"
                maxLength={300}
                onChange={(e) => setBio(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>
              <div className="sobre-aula-form">
                <div className="sobre-aula-materia">
                  <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value) }}
                    options={[
                      { value: 'Artes', label: 'Artes' },
                      { value: 'Biologia', label: 'Biologia' },
                      { value: 'Ciências', label: 'Ciências' },
                      { value: 'Educação física', label: 'Educação física' },
                      { value: 'Física', label: 'Física' },
                      { value: 'Geografia', label: 'Geografia' },
                      { value: 'História', label: 'História' },
                      { value: 'Matemática', label: 'Matemática' },
                      { value: 'Português', label: 'Português' },
                      { value: 'Química', label: 'Química' },
                    ]}
                  />
                </div>

                <div className="sobre-aula-valor">
                  <Input 
                    name="cost" 
                    label="Custo da sua hora por aula"
                    value={cost}
                    onChange={(e) => { setCost(e.target.value) }}
                    modify={true}
                    nameClass="valor"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
                </button>
              </legend>
              
              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                    <Select 
                      name="week_day" 
                      label="Dia da semana"
                      value={scheduleItem.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                      ]}
                    />

                    <Select 
                      name="from" 
                      label="De"
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                      options={hoursOptions.map(item => (item))}
                    />

                    <Select 
                      name="to" 
                      label="Até"
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                      options={hoursOptions.map(item => (item))}
                    />
                  </div>
                );
              })}
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso importante" />
                Importante! <br />
                Preencha todos os dados
              </p>

              <button type="submit">
                Salvar cadastro
              </button>
            </footer>
          </form>
        </main>
      </div>

      {
        success? 
          <ProffySuccess 
            title="Cadastro salvo!"
            description={`Tudo certo, seu cadastro está na nossa lista de professores. | Agora é só ficar de olho no seu WhatsApp`}
            label="Acessar"
            To=""
          /> 
        : 
          null
      }
    </>
  )
}

export default TeacherForm;