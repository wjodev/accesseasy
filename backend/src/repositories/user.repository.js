import db from "../config/db.js";

class UserRepository {
    async cadastrar(usuario){
        const {nome, cpf, email, senha, telefone, localizacao_id, tipo_usuario_id} = usuario;
        const sql = "INSERT INTO usuarios (nome, cpf, email, senha, telefone, localizacao_id, tipo_usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, nome, cpf, email, telefone, localizacao_id, tipo_usuario_id;";
        const result = await db.query(sql, [
            nome,
            cpf,
            email,
            senha,
            telefone,
            localizacao_id, 
            tipo_usuario_id
        ]);
        return result.rows[0];
    }

    async listar(){
        const sql = `
            SELECT
                u.id,
                u.nome,
                u.cpf,
                u.email,
                u.telefone,
                u.localizacao_id,
                u.tipo_usuario_id,
                t.nome AS tipo_usuario
            FROM usuarios u
            INNER JOIN tipos_usuario t
                ON t.id = u.tipo_usuario_id
            ORDER BY u.id;`;

        const result = await db.query (sql);      
        return result.rows;
    }

    async buscarCPF(cpf){
        const sql = `
        SELECT
            u.id,
            u.nome,
            u.cpf,
            u.email,
            u.localizacao_id,
            u.tipo_usuario_id,
            t.nome AS tipo_usuario
        FROM usuarios u
        INNER JOIN tipos_usuario t
            ON t.id = u.tipo_usuario_id
        WHERE u.cpf = $1;`;
        
        const result = await db.query (sql,[cpf]);      
        return result.rows[0];
    }

    async buscarId(id){
        const sql = `
            SELECT
                u.id,
                u.nome,
                u.cpf,
                u.email,
                u.telefone,
                u.localizacao_id,
                u.tipo_usuario_id,
                t.nome AS tipo_usuario
            FROM usuarios u
            INNER JOIN tipos_usuario t
                ON t.id = u.tipo_usuario_id
            WHERE u.id = $1;
        `;
    
        const result = await db.query(sql, [id]);
        return result.rows[0];
    }

    async buscarEmail(email){
        const sql = `
        SELECT
            u.id,
            u.nome,
            u.cpf,
            u.email,
            u.localizacao_id,
            u.tipo_usuario_id,
            t.nome AS tipo_usuario
        FROM usuarios u
        INNER JOIN tipos_usuario t
            ON t.id = u.tipo_usuario_id
        WHERE u.email = $1;`;

        const result = await db.query (sql,[email]);      
        return result.rows[0];
    }

    async atualizar(usuario, id){
        const {
            email,
            senha,
            telefone,
            localizacao_id
        } = usuario;
    
        const sql = `
            UPDATE usuarios
            SET
                email = $1,
                senha = $2,
                telefone = $3,
                localizacao_id = $4
            WHERE id = $5
            RETURNING
                id,
                nome,
                email,
                telefone,
                localizacao_id,
                tipo_usuario_id;
        `;
    
        const result = await db.query(sql, [
            email,
            senha,
            telefone,
            localizacao_id,
            id
        ]);
    
        return result.rows[0];
    }

    async remover(id){
        const sql = "DELETE FROM usuarios WHERE id = $1 RETURNING id, nome, cpf, email, localizacao_id, tipo_usuario_id;";
        const result = await db.query (sql,[id]);
        return result.rows[0];
    }

    async autenticar(email){
        const sql = `
        SELECT
            u.id,
            u.nome,
            u.cpf,
            u.email,
            u.senha,
            u.localizacao_id,
            u.tipo_usuario_id,
            t.nome AS tipo_usuario
        FROM usuarios u
        INNER JOIN tipos_usuario t
            ON t.id = u.tipo_usuario_id
        WHERE u.email = $1;`;
        
        const result = await db.query (sql,[email]);
        return result.rows[0];
    }

    async buscarTipoUsuario(id){
        const sql = `
            SELECT id, nome
            FROM tipos_usuario
            WHERE id = $1;
        `;
    
        const result = await db.query(sql, [id]);
        return result.rows[0];
    }

    async atualizarTipoUsuario(id, tipo_usuario_id){
        const sql = `
            UPDATE usuarios
            SET tipo_usuario_id = $1
            WHERE id = $2
            RETURNING
                id,
                nome,
                email,
                tipo_usuario_id;
        `;
    
        const result = await db.query(sql, [
            tipo_usuario_id,
            id
        ]);
    
        return result.rows[0];
    }
};
export default new UserRepository();