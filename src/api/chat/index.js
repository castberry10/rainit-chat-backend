import Router from 'koa-router';
import { justrainit } from './quizrainit.ctrl.js';

const chat = new Router();

chat.post('/just', justrainit);
chat.post('/see', seerainit);
chat.post('/magic', magicrainit);
chat.post('/quiz', quizrainit);

export default chat;
