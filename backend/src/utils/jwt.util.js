import jwt from "jsonwebtoken";

class JwtUtil {

    gerarToken(usuario) {
        const {
            id,
            nome,
            email,
            tipo_usuario_id
        } = usuario;

        return jwt.sign(
            {
                id,
                nome,
                email,
                tipo_usuario_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );
    }
}

export default new JwtUtil();
