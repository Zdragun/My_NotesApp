import express from "express";
import tasksRoutes from './routers/tasks';
import sequelize from './databaseUser.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";
import cors from "cors";
import morgan from "morgan";

const app = express();
const specs = swaggerJSDoc(options);


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sequelize.sync();

app.use(tasksRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;