import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import debug from 'debug';
import expressStatusMonitor from 'express-status-monitor';
import productRoutes from './routes/product.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors());         // Enable CORS
app.use(helmet());       // Secure HTTP headers
app.use(morgan('dev'));  // Log HTTP requests
app.use(morgan('combined'));


const monitor = expressStatusMonitor({ path: '/api' });
app.use(monitor);

const log = debug('app:server');
log('Server is running...');
// ✅ Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript + Express!');
});

app.use('/api',productRoutes)

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
