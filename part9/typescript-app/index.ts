import express from 'express';
import calculcateBMI from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({
      error: 'missing height or weight params'
    });
  }

  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({
      error: 'height and weight must be numbers'
    });
  }

  return res.json({
    weight,
    height,
    bmi: calculcateBMI(height, weight)
  });
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  let error = false;

  if (!Array.isArray(dailyExercises)) {
    error = true;
  } else if (typeof target !== 'number') {
    error = true;
  } else {
    for (let hours of dailyExercises) {
      if (typeof hours !== 'number') {
        error = true;
        break;
      }
    }
  }

  if (error) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  return res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});