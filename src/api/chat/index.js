import express from 'express';
import quizrainit from './quizrainit.ctrl.js';
import justrainit from './justrainit.ctrl.js';
import seerainit from './seerainit.ctrl.js';
import magicrainit from './magicrainit.ctrl.js';

const chat = express.Router();

chat.post('/just', justrainit);
chat.post('/see', seerainit);
chat.post('/magic', magicrainit);
chat.post('/quiz', quizrainit);

export default chat;
