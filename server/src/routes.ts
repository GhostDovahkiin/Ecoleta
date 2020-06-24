import express from "express";

import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

const pointsController = new PointsController();
const itemsController = new ItemsController();

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    api: 'Ecoleta API',
    by: 'Pedro Henrique',
    repo: 'https://github.com/ghostdovahkiin/Ecoleta'
  });
});

routes.get("/items", itemsController.index);
routes.post("/points", pointsController.create);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;