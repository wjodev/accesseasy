import jwt from "jsonwebtoken";

class AuthMiddleware {

    autenticar(req, res, next) {

        //---------------------busca token--------------------------
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                erro: "Token não informado."
            });
        }

        //---------------------separa bearer e token----------------
        const [tipo, token] = authHeader.split(" ");

        if (tipo !== "Bearer" || !token) {
            return res.status(401).json({
                erro: "Token inválido."
            });
        }

        //---------------------valida token-------------------------
        try {

            const usuario = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            //---------------------salva usuario na requisição------
            req.usuario = usuario;

            return next();

        } catch (error) {

            return res.status(401).json({
                erro: "Token inválido ou expirado."
            });
        }
    }
}

export default new AuthMiddleware();