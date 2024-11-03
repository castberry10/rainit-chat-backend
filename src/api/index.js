import express from 'express';

const api = express.Router();

// api.use('/auth', auth); // auth 모듈에서 라우터를 Express 스타일로 설정했다고 가정

// 테스트 api
api.get('/', (req, res) => {
  res.send('hello world');
});

export default api;
