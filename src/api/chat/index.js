import express from 'express';
import quizrainit from './quizrainit.ctrl.js';
import justrainit from './justrainit.ctrl.js';
import searainit from './searainit.ctrl.js';
import magicrainit from './magicrainit.ctrl.js';

const chat = express.Router();

chat.post('/just', justrainit);
chat.post('/sea', searainit);
chat.post('/magic', magicrainit);
chat.post('/quiz', quizrainit);

export default chat;
