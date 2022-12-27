import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import employeeRouter from "./routes/employeeRoutes.js";
import departmentRouter from "./routes/departmentRoutes.js";
import performanceRouter from "./routes/performanceRoutes.js";
import trainingRouter from "./routes/trainingRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/employees", employeeRouter);
app.use("/departments", departmentRouter);
app.use("/performance", performanceRouter);
app.use("/training", trainingRouter);
app.use("/user", userRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`server running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

export default app;
