import dotenv from 'dotenv';
import express from 'express';
import api from './api/index.js';
import cookieParser from 'cookie-parser';
// import db from './models/index.js';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
dotenv.config();
const { PORT, NODE_ENV, MONGO_URI} = process.env;

// mongoose.connect(MONGO_URI)
// 	.then(()=>{
// 	console.log('Connected to MongoDB')
// 	// createFakeData(); fake 데이터 생성
// 	})
// 	.catch(e => {
// 	console.error(e);
// });

const app = express();


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(cors()); // CORS 설정
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api', api); // API 라우트 설정
// app.use('/chat', chat);
app.use(morgan('dev'));

const port = PORT || 7070;

if (NODE_ENV === 'production') {
  // 프로덕션 환경에서 HTTPS 서버 실행
  const options = {
    key: fs.readFileSync('/home/castberry/ssl/privkey.pem'),
    cert: fs.readFileSync('/home/castberry/ssl/fullchain.pem'),
  };

  https.createServer(options, app).listen(port, () => {
    console.log('Listening to port %d with HTTPS', port);
  });
} else {
  // 개발 환경에서 HTTP 서버 실행
  app.listen(port, () => {
    console.log('Listening to port %d', port);
  });
}