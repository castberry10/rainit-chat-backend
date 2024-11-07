import Router from 'koa-router';
import { justrainit } from './justrainit.ctrl.js';

const chat = new Router();

chat.post('/just', justrainit);

export default chat;
