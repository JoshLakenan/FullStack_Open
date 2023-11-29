import express from 'express';
import diagnosesRouter from './routes/diagnoses';
const cors = require('cors');
const app = express();

app.use(cors())
app.use('/api/diagnoses', diagnosesRouter);
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});