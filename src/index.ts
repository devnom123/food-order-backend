import express, {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import restaurantRoute from "./routes/restaurantRoutes";

mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.log("Error connecting to the database: ", error.message);
});

const app = express();
app.use(express.json());

app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});