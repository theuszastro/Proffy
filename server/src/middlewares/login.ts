import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if(!authorization)
            return res.status(400).json({ error: 'Favor Fazer login' });

        const [text, token] = authorization.split(' ');

        const tokenisValid: any = jwt.verify(token, 'ba6bc61904b5d0b35f8cffb75077e5d1');

        req.body.userId = tokenisValid.id;

        next();
    } catch (error) {
        console.log(error);

        return res.status(400).json({ error: 'Erro, Login requido' })
    }
}