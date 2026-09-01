import db from "../config/db.js";

class ProprietarioGestorRepository {

    async cadastrar(usuario_id) {
        const sql = `
            INSERT INTO proprietario_gestor (usuario_id)
            VALUES ($1)
            RETURNING id, usuario_id;
        `;

        const result = await db.query(sql, [usuario_id]);
        return result.rows[0];
    }

    async listar() {
        const sql = `
            SELECT
                pg.id,
                pg.usuario_id,
                u.nome,
                u.cpf,
                u.email,
                u.telefone
            FROM proprietario_gestor pg
            INNER JOIN usuarios u
                ON u.id = pg.usuario_id
            ORDER BY pg.id;
        `;

        const result = await db.query(sql);
        return result.rows;
    }

    async buscarId(id) {
        const sql = `
            SELECT
                pg.id,
                pg.usuario_id,
                u.nome,
                u.cpf,
                u.email,
                u.telefone
            FROM proprietario_gestor pg
            INNER JOIN usuarios u
                ON u.id = pg.usuario_id
            WHERE pg.id = $1;
        `;

        const result = await db.query(sql, [id]);
        return result.rows[0];
    }

    async buscarUsuarioId(usuario_id) {
        const sql = `
            SELECT
                id,
                usuario_id
            FROM proprietario_gestor
            WHERE usuario_id = $1;
        `;

        const result = await db.query(sql, [usuario_id]);
        return result.rows[0];
    }

    async remover(id) {
        const sql = `
            DELETE FROM proprietario_gestor
            WHERE id = $1
            RETURNING id, usuario_id;
        `;

        const result = await db.query(sql, [id]);
        return result.rows[0];
    }
}

export default new ProprietarioGestorRepository();