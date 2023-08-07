import fs from 'fs';
import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

//import Prisma from '@/config/prisma';
import { errorHandler } from '@/api/v1/middleware/errorHandler';
import { logRequests } from '@/api/v1/middleware/logRequests';

import * as dotenv from 'dotenv';
//import prisma from '@/config/prisma';
dotenv.config();

export const app: Application = express();

const swaggerFile = `${process.cwd()}/src/api/v1/docs/index.json`;
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerJSON = JSON.parse(swaggerData);

// middleware
app.use(cors());
app.use(logRequests);
app.use(express.json());

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

// error handler
app.use(errorHandler);

const isRunningLocally = process.env.NODE_ENV !== 'production';

if (isRunningLocally) {
  const port = process.env.Port || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
