import './bootstrap';
import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import helmet from 'helmet';

import routes from './routes';

import './database';
import AppError from './lib/app-error';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      console.log(err);

      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    });
  }
}

export default new App().server;
