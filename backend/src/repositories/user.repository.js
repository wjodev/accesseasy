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

    async buscarUsuario(cpf){

        const sql = "SELECT nome, email FROM usuarios WHERE cpf = $1";
        
        const result = await db.query (sql,[cpf]);      
        return result.rows[0];
    }


};

export default new UserRepository();

/*const criarUsuario = async (usuario) => {
    const { nome, cpf, email, senha, telefone } = usuario;

    const query = `
        INSERT INTO usuarios
        (nome, cpf, email, senha, telefone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING * 
    `;//remover o returning depois

    const valores = [
        nome,
        cpf,
        email,
        senha,
        telefone
    ];

    const resultado = await db.query(query, valores);

    return resultado.rows[0];
};

export default {
    criarUsuario
};*/
