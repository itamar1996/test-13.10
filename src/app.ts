import express from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

// import postRouter from "./routes/postRoutes";
// import userRouter from "./routes/userRoutes";
// import authRouter from "./routes/authRoute";
// import verifyUser from './middleware/verifyUser'
import cookieParser from 'cookie-parser';
// import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load(path.join(__dirname, './swager/swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cookieParser());
app.use(express.json());


connectDB();

// Routes
// app.use("/api/auth", authRouter);
// app.use("/api/posts", verifyUser,postRouter);
// app.use("/api/users", userRouter);


// Error handling middleware
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
