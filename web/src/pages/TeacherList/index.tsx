import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/header';
import Select from '../../components/select';
import Input from '../../components/Input';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import './styles.css'; 

export const hoursOptions = [
  { value: '00:30', label: '00:30' },
  { value: '01:00', label: '01:00' },
  { value: '01:30', label: '01:30' },
  { value: '02:00', label: '02:00' },
  { value: '02:30', label: '02:30' },
  { value: '03:00', label: '03:00' },
  { value: '03:30', label: '03:30' },
  { value: '04:00', label: '04:00' },
  { value: '04:30', label: '04:30' },
  { value: '05:00', label: '05:00' },
  { value: '05:30', label: '05:30' },
  { value: '06:00', label: '06:00' },
  { value: '06:30', label: '06:30' },
  { value: '07:00', label: '07:00' },
  { value: '07:30', label: '07:30' },
  { value: '08:00', label: '08:00' },
  { value: '08:30', label: '08:30' },
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30' },
  { value: '10:00', label: '10:00' },
  { value: '10:30', label: '10:30' },
  { value: '11:00', label: '11:00' },
  { value: '11:30', label: '11:30' },
  { value: '12:00', label: '12:00' },
  { value: '12:30', label: '12:30' },
  { value: '13:00', label: '13:00' },
  { value: '13:30', label: '13:30' },
  { value: '14:00', label: '14:00' },
  { value: '14:30', label: '14:30' },
  { value: '15:00', label: '15:00' },
  { value: '15:30', label: '15:30' },
  { value: '16:00', label: '16:00' },
  { value: '16:30', label: '16:30' },
  { value: '17:00', label: '17:00' },
  { value: '17:30', label: '17:30' },
  { value: '18:00', label: '18:00' },
  { value: '18:30', label: '18:30' },
  { value: '19:00', label: '19:00' },
  { value: '19:30', label: '19:30' },
  { value: '20:00', label: '20:00' },
  { value: '20:30', label: '20:30' },
  { value: '21:00', label: '21:00' },
  { value: '21:30', label: '21:30' },
  { value: '22:00', label: '22:00' },
  { value: '22:30', label: '22:30' },
  { value: '23:00', label: '23:00' },
  { value: '23:30', label: '23:30' },
  { value: '24:00', label: '24:00' }
]

const TeacherList: React.FC = () => {
  const history = useHistory();

  const [teachers, setTeachers] = useState([]);
  const [Proffy, setProffy] = useState(0);
  const [NoResults, setNoResults] = useState(false);

  const [Subject, setSubject] = useState('');
  const [WeekDay, setWeekDay] = useState('');
  const [Time, setTime] = useState('');

  const getTeachers = async () => {
    try {
      const classes = await api.get('/classes')

      setTeachers(classes.data.classes);
    } catch (err) {
      console.log(err);
    }
  }

  const getTotal = async () => {
    try {
      const Total = await api.get('/classe')

      setProffy(Total.data.total);

      getTeachers();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getTeachersFiltro = async () => {
      try {
        NoResults && setNoResults(false);

        const response = await api.get('/filtro', {
          params: {
            subject: Subject,
            week_day: WeekDay,
            time: Time
          }
        });

        setTeachers(response.data.classes);
      } catch (err) {
        setNoResults(true);

        console.log(err);
      }
    }

    async function Execute () {
      await getTeachersFiltro();
    }

    if(Subject.length > 0 && WeekDay.length > 0 && Time.length > 0)
      Execute();

  }, [Subject, WeekDay, Time])

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div id="page-teacher-list">
     <Header 
        title="Estes são os | proffys disponiveis."
        label={`Nós temos ${Proffy} | proffys disponiveis.`}
        section="Estudar"
        icon="smile"
      />

      <main className="list-teachers">
        <div className="filtros">
          <div className="filtro">
            <div className="align">
              <Select 
                name="subject" 
                label="Matéria"
                value={Subject}
                onChange={e => setSubject(e.target.value)}
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
                  { value: 'Química', label: 'Química' }
                ]}
              /> 
            </div>

            <div className="align">
              <Select 
                name="week_day" 
                label="Dia da semana"
                value={WeekDay}
                onChange={e => setWeekDay(e.target.value)}
                options={[
                  { value: '1', label: 'Segunda-feira' },
                  { value: '2', label: 'Terça-feira' },
                  { value: '3', label: 'Quarta-feira' },
                  { value: '4', label: 'Quinta-feira' },
                  { value: '5', label: 'Sexta-feira' }
                ]}
              />
            </div>

            <div className="align input">
              <Select 
                name="hours" 
                label="Horário"
                value={Time}
                onChange={e => setTime(e.target.value)}
                options={hoursOptions.map(item => (item))}
              />
            </div>
          </div>
        </div>

        {
          teachers && teachers.reverse().map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} />
          ))
        }
      </main>
    </div>
  )
}

export default TeacherList;