import express from 'express';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    api: 'Ecoleta API',
    by: 'Pedro Henrique',
    repo: 'https://github.com/ghostdovahkiin/Ecoleta'
  });
});

export default routes;