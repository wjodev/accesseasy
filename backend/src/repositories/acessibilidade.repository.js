import db from "../config/db.js";

class AcessibilidadeRepository{
    async cadastrarCategoria(categoria){
       const {nome} = categoria
       const sql = "INSERT INTO categoria_acessibilidade (nome) VALUES ($1) RETURNING id, nome;"
       const result = await db.query(sql,[nome]);
       return result.rows[0];
    }

    async atualizarCategoria(id,categoria){
        const {nome} = categoria;
        const sql = "UPDATE categoria_acessibilidade SET nome = $2 WHERE id = $1 RETURNING id, nome;";
        const result = await db.query(sql,[id, nome]);
        return result.rows[0];
    }

    async listarCategoria(){
        const sql = "SELECT id, nome FROM categoria_acessibilidade ORDER BY id;";
        const result = await db.query(sql);
        return result.rows;
    }
    async listarCategoriaID(id){
        const sql = "SELECT id, nome FROM categoria_acessibilidade WHERE id = $1;";
        const result = await db.query(sql,[id]);
        return result.rows[0];
    }

    async removerCategoria(id){
        const sql = "DELETE FROM categoria_acessibilidade WHERE id = $1 RETURNING id, nome;";
        const result = await db.query(sql,[id]);
        return result.rows[0];
    }

    async cadastrarSuporte(suporte){
        const {categoria_id,nome} = suporte;
        const sql = ("INSERT INTO suporte_acessibilidade (categoria_id, nome) VALUES($1, $2) RETURNING id, categoria_id, nome;");
        const result = await db.query(sql,[categoria_id, nome])
        return result.rows[0];
    }

    async listarSuporte(){
        const sql = (`SELECT 
                        s.id, s.nome, s.categoria_id, c.nome AS categoria_nome 
                        FROM suporte_acessibilidade s 
                        INNER JOIN categoria_acessibilidade c 
                        ON c.id = s.categoria_id 
                        ORDER BY c.nome, s.nome;`);
        const result =await db.query(sql);
        return result.rows;
    }

    async listarSuporteID(id){
        const sql = (`SELECT 
                        s.id, s.nome, s.categoria_id, c.nome AS categoria_nome 
                        FROM suporte_acessibilidade s 
                        INNER JOIN categoria_acessibilidade c 
                        ON c.id = s.categoria_id 
                        WHERE s.id = $1;`);
        const result =await db.query(sql,[id]);
        return result.rows[0];
    }

    async atualizarSuporte(id,suporte){
        const {nome} = suporte;
        const sql = "UPDATE suporte_acessibilidade SET nome = $1 WHERE id = $2 RETURNING id, categoria_id, nome;";
        const result = await db.query(sql,[nome, id]);
        return result.rows[0];
    }

    async removerSuporte(id){
        const sql = "DELETE FROM suporte_acessibilidade WHERE id = $1 RETURNING id, categoria_id, nome;";
        const result = await db.query(sql,[id]);
        return result.rows[0];
    }


}export default new AcessibilidadeRepository();
