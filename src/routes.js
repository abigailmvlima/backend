import { Router } from "express";
import multer from "multer";
import uploadCongif from "./config/upload.js";
import DashboardController from "./controllers/DashboardController.js";
import HouseController from "./controllers/HouseController.js";
import ReserveController from "./controllers/ReserveController.js";
import SessionController from "./controllers/sessionController.js";

const routes = new Router();
const upload = multer(uploadCongif);

routes.post("/sessions", SessionController.store);
routes.post("/houses", upload.single("thumbnail"), HouseController.store);
routes.get("/houses", HouseController.index);
routes.put(
  "/houses/:house_id",
  upload.single("thumbnail"),
  HouseController.update
);

routes.delete("/houses", HouseController.delete);

routes.get("/dashboard", DashboardController.show);

routes.post("/houses/:house_id/reserve", ReserveController.store);

export default routes;
