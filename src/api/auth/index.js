import express from 'express';
import { login, register } from './auth.ctrl.js'; // auth.ctrl 모듈 경로에 맞게 변경

const auth = express.Router();

auth.post('/register', register);
auth.post('/login', login);
// auth.post('/logout', logout); // 로그아웃이 필요하다면 여기에 추가

export default auth;
