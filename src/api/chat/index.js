import Router from 'koa-router';
import { justrainit } from './justrainit.ctrl.js';

const matchmaking = new Router();

matchmaking.post('/just', justrainit);

export default matchmaking;
