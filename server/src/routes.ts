import express from 'express';
const routes = express.Router();
import knex from './database/connection';

routes.get('/', (req, res) => {
  res.status(200).json({
    api: 'Ecoleta API',
    by: 'Pedro Henrique',
    repo: 'https://github.com/ghostdovahkiin/Ecoleta'
  });
});

routes.get('/items', async (req, res) => {
  const items = await knex('items').select('*');
  const serializedItems = items.map(item => {
    return {
      name: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return res.status(200).json(serializedItems);

});

export default routes;