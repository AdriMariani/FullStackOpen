import express from 'express';
import calculcateBMI from './bmiCalculator';
const app = express();

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
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});