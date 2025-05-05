import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import debug from 'debug';
import expressStatusMonitor from 'express-status-monitor';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors());         // Enable CORS
app.use(helmet());       // Secure HTTP headers
app.use(morgan('dev'));  // Log HTTP requests
app.use(morgan('combined'));
app.use(expressStatusMonitor());


app.get('/status', expressStatusMonitor());
const log = debug('app:server');
log('Server is running...');
// ✅ Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript + Express!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
