import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculator, Operation} from './calculator';
import {calculateExercises, rating} from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const testing: any = 'testing';

  const { value1, value2, op } = req.body;

  // if ( !value1 || isNaN(Number(value1)) ) {   // Narrowing
  //   return res.status(400).send({ error: '...'});
  // }


  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({ result });
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  let daily_exercises = req.body.daily_exercises;
  let target = req.body.target;

  try {
    if (!daily_exercises || !target) throw new Error('parameters missing');
    if (!Array.isArray(daily_exercises) ||
        typeof target !== 'number') throw new Error('malformatted parameters');

    let rate: rating = req.body.daily_exercises[0];
    if (![1, 2, 3].includes(rate)) throw new Error('malformatted parameters');

    const output = calculateExercises(daily_exercises, rate, target);
    res.send(JSON.stringify(output));

  } catch (error) {
    res.status(400).json({error: error.message});
  }
});


app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight)

  try {
    if (!height || !weight) {
      throw new Error('malformatted parameters');
    } else {
      const bmi = calculateBmi(height, weight);

      res.send(JSON.stringify({weight, height, bmi}));
    }
  } catch (error) {
    res.status(400).send(JSON.stringify({error: error.message}))
  }
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});