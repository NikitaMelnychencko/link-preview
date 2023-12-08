import express, { Request, Response, NextFunction } from 'express';

import logger from 'morgan';
import cors from 'cors';

import helmet from 'helmet';

import limiter from './libs/limiter';
import { engine } from 'express-handlebars';


import httpsRedirect from 'express-https-redirect';

import PrevLinkRouter from './routes/link.routes';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
