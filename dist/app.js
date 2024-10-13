"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
// import postRouter from "./routes/postRoutes";
// import userRouter from "./routes/userRoutes";
// import authRouter from "./routes/authRoute";
// import verifyUser from './middleware/verifyUser'
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { errorHandler } from "./middleware/errorHandler";
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, './swager/swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
// Routes
// app.use("/api/auth", authRouter);
// app.use("/api/posts", verifyUser,postRouter);
// app.use("/api/users", userRouter);
// Error handling middleware
// app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
