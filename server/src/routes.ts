import express from 'express';

import LoginReq from './middlewares/login';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UserController from './controllers/UserController';
const router = express.Router();

const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();
const UsersController = new UserController();

router.get('/auth', LoginReq, (req, res) => {
	return res.status(200).json({ id: req.body.userId });
});	
router.get('/user/:userId', UsersController.findUser);
router.post('/register', UsersController.create);
router.post('/login', UsersController.login);

router.get('/classes', classesControllers.index);
router.get('/filtro', classesControllers.filter);
router.get('/classe', classesControllers.classLength);
router.post('/classes', LoginReq, classesControllers.create);

router.get('/connections', connectionsController.index);
router.post('/connections', LoginReq, connectionsController.create);

export default router;