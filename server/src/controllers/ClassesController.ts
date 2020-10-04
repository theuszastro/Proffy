import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async classLength(request: Request, response: Response){
    try {
      const totalClasses = await db('classes').count('* as total');

      const { total } = totalClasses[0];

      return response.json({ total });
    } catch (err) {
      return response.status(400).json({ error: 'Erro ao listar' });
    }
  }

  async index(request: Request, response: Response){
    try {
      const classes = await db('classes');
      const classeHours = await db('class_schedule');
      const users = await db('users');
      const proffy = await db('proffy');

      const FormatData = (item: { week_day: number, from: number, to: number, class_id: string }) => {
        let WeekDay = '';

        switch(item.week_day){
          case 1:
            WeekDay = 'Segunda-Feira';
            break;

          case 2:
            WeekDay = 'Terça-Feira';
            break;

          case 3: 
            WeekDay = 'Quarta-Feira';
            break;

          case 4:
            WeekDay = 'Quinta-Feira';
            break;

          case 5:
            WeekDay = 'Sexta-Feira';
            break;
        }

        return {
          week_day: WeekDay,
          from: `${Math.round(item.from / 60)}h`,
          to: `${Math.round(item.to / 60)}h`,
          class_id: +item.class_id
        }
      }

      const classeFormated = classes.map((classe, index) => {
        const HoursFiltred = classeHours.filter(item => item.class_id === classes[index].id);
        const ClassesFiltred = classes.filter(item => item.id === HoursFiltred[0].class_id);
        const proffyFiltred = proffy.filter(item => item.id === ClassesFiltred[0].by_proffy); 
        const usersFiltred = users.filter(item => item.id === +proffyFiltred[0].user_id);

        const DataFormated = HoursFiltred.map((item) => {
          return FormatData(item);
        })

        return {
          id: classe.id,
          cost: classe.cost,
          subject: classe.subject,
          data: DataFormated,
          proffy: {
            id: proffyFiltred[0].id,
            whatsapp: proffyFiltred[0].whatsapp,
            bio: proffyFiltred[0].bio,
            user: {
              id: usersFiltred[0].id,
              nome: usersFiltred[0].nome,
              sobrenome: usersFiltred[0].sobrenome,
              email: usersFiltred[0].email,
              photo: usersFiltred[0].photo
            }
          }
        }
      });

      return response.status(200).json({ classes: classeFormated });
    } catch (err) {
      console.log(err);

      return response.status(400).json({ error: 'Erro ao listar proffys' })
    }
  }

  async filter(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }
    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes').where('subject', subject);
    const class_schedule = await db('class_schedule')
      .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
      .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
      .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);

    const proffys = await db('proffy');
    const users = await db('users');

    const FormatData = (item: { week_day: number, from: number, to: number, class_id: string }) => {
        let WeekDay = '';

        switch(item.week_day){
          case 1:
            WeekDay = 'Segunda-Feira';
            break;

          case 2:
            WeekDay = 'Terça-Feira';
            break;

          case 3: 
            WeekDay = 'Quarta-Feira';
            break;

          case 4:
            WeekDay = 'Quinta-Feira';
            break;

          case 5:
            WeekDay = 'Sexta-Feira';
            break;
        }

        return {
          week_day: WeekDay,
          from: `${Math.round(item.from / 60)}h`,
          to: `${Math.round(item.to / 60)}h`,
          class_id: +item.class_id
        }
    }

    const ClassesFormated = classes.map((classe, index) => {
      const scheduleFiltred = class_schedule.filter(item => item.class_id === classes[index].id);
      const proffyFiltred = proffys.filter(item => item.id === classes[index].by_proffy);
      const usersFiltred = users.filter(item => item.id === +proffys[index].user_id);

      if(scheduleFiltred.length == 0)
        return response.status(400).json({ error: 'Sem nada para mostrar' });

      const DataFormated = scheduleFiltred.map((item) => {
        return FormatData(item);
      })

      return {
        id: classe.id,
        cost: classe.cost,
        subject: classe.subject,
        data: DataFormated,
        proffy: {
          id: proffyFiltred[0].id,
          whatsapp: proffyFiltred[0].whatsapp,
          bio: proffyFiltred[0].bio,
          user: {
            id: usersFiltred[0].id,
            nome: usersFiltred[0].nome,
            sobrenome: usersFiltred[0].sobrenome,
            email: usersFiltred[0].email,
            photo: usersFiltred[0].photo
          }
        }
      }
    })

    return response.json({ classes: ClassesFormated });
  }

  async create(request: Request, response: Response) {
    const {
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
      userId
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('proffy').insert({
        user_id: userId,
        whatsapp,
        bio
      });
    
      const proffyId = insertedUsersIds[0];

      console.log(proffyId);
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        by_proffy: proffyId,
      });
    
      const class_id = insertedClassesIds[0];
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      })
    
      await trx('class_schedule').insert(classSchedule);
    
      await trx.commit();
    
      return response.status(201).send();
    } catch (err) {
      console.log(err);

      await trx.rollback();
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}