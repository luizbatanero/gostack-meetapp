import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';
import AvatarController from './app/controllers/AvatarController';
import BannerController from './app/controllers/BannerController';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.get('/', (req, res) => res.send(':)'));

routes.post('/users', UserController.store);
routes.post('/sessions', bruteForce.prevent, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);
routes.post('/meetups/:id/subscriptions', SubscriptionController.store);

routes.get('/organizing', OrganizingController.index);
routes.get('/organizing/:id', OrganizingController.show);
routes.get('/subscriptions', SubscriptionController.index);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.post('/upload/avatar', upload.single('file'), AvatarController.store);
routes.post('/upload/banner', upload.single('file'), BannerController.store);

export default routes;
