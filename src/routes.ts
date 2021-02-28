import {Router} from 'express';
import AuthMiddleware from './middlewares/authMiddleware';
import VerseOfDayController from './controllers/VerseOfDayController';

const routes = Router();

const authMiddleware = new AuthMiddleware();
const verseOfDayController = new VerseOfDayController();

routes.get('/bible/verse-of-day/chapter/:book/:chapter', authMiddleware.validate, verseOfDayController.getChapter);
routes.get('/', (request, response)=>{
  return response.json({msg: "Hello World"});
});
export default routes;