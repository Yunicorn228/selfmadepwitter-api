// app.js
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import authRouter from './routes/auth';
import connectToDatabase from './db';
import guard from './helpers/jwt';

const app = express();

connectToDatabase();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);
// guard ask for token
app.use(guard);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

export default app;
