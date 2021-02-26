import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { AppError } from './errors/appError';
import { router } from './routes';
import createConnection from "./database";
import 'reflect-metadata'
import './database'

createConnection();
const app = express();

app.use(express.json());
app.use(router);
app.use(
  (err: Error, _: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      })
    }

    return response.status(500).json({
      message: 'Internal server error',
      detail: err
    })
  }
)

export { app };