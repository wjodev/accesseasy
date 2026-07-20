import jwt from "jsonwebtoken";

class JwtUtil{

    gerarToken(usuario){
        const {id, nome, email} = usuario
        const token =  jwt.sign({id, nome, email}, process.env.JWT_SECRET,  
            {
            expiresIn: process.env.JWT_EXPIRES_IN
            });
        return (token);
    }

} export default new JwtUtil();
