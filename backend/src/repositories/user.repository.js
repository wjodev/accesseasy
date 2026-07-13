import db from "../config/db.js";

class UserRepository {
    async cadastrar(usuario){
        const {nome, cpf, email, senha, telefone} = usuario;
        const sql = "INSERT INTO usuarios (nome, cpf, email, senha, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, cpf, email, telefone;";
        const result = await db.query(sql, [
            nome,
            cpf,
            email,
            senha,
            telefone
        ]);
        return result.rows[0];
    }

    async listar(){
        const sql = "SELECT id, nome, email, telefone FROM usuarios";
        const result = await db.query (sql);      
        return result.rows;
    }

    async buscarUsuario(cpf){
        const sql = "SELECT nome, email FROM usuarios WHERE cpf = $1";
        const result = await db.query (sql,[cpf]);      
        return result.rows[0];
    }

    async atualizar(usuario, id){
        const {email, senha, telefone} = usuario;
        const sql = "UPDATE usuarios SET email = $1, senha = $2, telefone = $3 WHERE id = $4 RETURNING id, nome, email, telefone;";
        const result = await db.query (sql, [
            email,
            senha,
            telefone,
            id]);
        return result.rows[0];
    }
};
export default new UserRepository();