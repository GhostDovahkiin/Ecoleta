import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    api: 'Ecoleta API',
    by: 'Pedro Henrique',
    repo: 'https://github.com/ghostdovahkiin/Ecoleta'
  });
});

app.listen(3333);
