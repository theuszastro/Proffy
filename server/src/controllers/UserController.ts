import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../database/connection';

export default class UserController {
    async findUser(req: Request, res: Response){
        try {
            const { userId } = req.params;

            const User = await db('users').where({ id: userId });

            const UserFormated = User.map(item => {
                return {
                    id: item.id,
                    nome: item.nome,
                    sobrenome: item.sobrenome,
                    email: item.email,
                    photo: item.photo
                }
            })

            return res.status(200).json({ User: UserFormated });
        } catch (err) {
            console.log(err);

            return res.status(400).json({ error: 'Erro ao buscar usuário' });
        }
    }

    async create(req: Request, res: Response){
        try {
            const { nome, sobrenome, email, photo } = req.body;
            const password = bcrypt.hashSync(req.body.password, 10);

            await db('users').insert({
                nome,
                sobrenome,
                email,
                password,
                photo
            });

            const User = await db('users').where({ nome });

            return res.status(200).json(User[0]);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar usuário' });
        }
    }

    async login(req: Request, res: Response){
        try {
            const { email, password, expiresIn } = req.body;

            if(!email)
                return res.status(400).json({ error: 'Email não digitada' });

            if(!password)
                return res.status(400).json({ error: 'Senha não digitada' });

            const User = await db('users').where({ email });

            if(User[0] === undefined)
                return res.status(302).json({ error: 'Usuário inexistente' });
            

            const passwordValid = await bcrypt.compare(password, User[0].password);

            if(!passwordValid)
                return res.status(400).json({ error: 'Senha Invalida' });

            const token = jwt.sign({
                id: User[0].id,
                email: User[0].email
            }, 'ba6bc61904b5d0b35f8cffb75077e5d1', {
                expiresIn
            });

            return res.status(200).json({ 
                id: User[0].id,
                token
            });
        } catch (error) {
            console.log(error);

            return res.status(400).json({ error: 'Erro ao fazer login' });
        }
    }

    async update(req: Request, res: Response){}
}
