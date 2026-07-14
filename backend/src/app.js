import express from "express";
import dotenv  from "dotenv";
import db from "./config/db.js";


//----------------------rotas------------------
import routes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";


dotenv.config(); 
const app = express();
app.use(express.json());

app.use(routes);
app.use(userRoutes);
app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;


try {
    const result = await db.connect();
    console.log("Banco ok");
} catch (error) {
    console.error("Errro banco:", error.message);
}


app.listen(PORT, () =>{
    console.log(`aplicação rodando em http://localhost:${PORT}`);
});


