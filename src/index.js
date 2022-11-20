import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import entriesRoutes from "./routes/entries.routes.js";
import exitRoutes from "./routes/exit.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoutes);
app.use(entriesRoutes);
app.use(exitRoutes);


app.listen(5000, () => console.log("Server running in port 5000"));
