import express from 'express';
import chat from './chat/index.js';
const api = express.Router();

// api.use('/auth', auth); // auth 모듈에서 라우터를 Express 스타일로 설정했다고 가정

api.use('/chat', chat);
// 테스트 api
api.get('/', (req, res) => {
  res.send('hello world');
});

export default api;
