import db from "../config/db.js";

class AcessibilidadeRepository{
    async cadastrarCategoria(categoria){
       const {nome} = categoria
       const sql = "INSERT INTO categorias_acessibilidade (nome) VALUES ($1) RETURNING id, nome;"
       const result = await db.query(sql,[nome]);
       return result.rows[0];
    }

    async atualizarCategoria(id,categoria){
        const {nome} = categoria;
        const sql = "UPDATE categorias_acessibilidade SET nome = $2 WHERE id = $1 RETURNING id, nome;";
        const result = await db.query(sql,[id, nome]);
        return result.rows[0];
    }

    async listarCategoria(){
        const sql = "SELECT id, nome FROM categorias_acessibilidade ORDER BY id;";
        const result = await db.query(sql);
        return result.rows;
    }
    async listarCategoriaID(id){
        const sql = "SELECT id, nome FROM categorias_acessibilidade WHERE id = $1;";
        const result = await db.query(sql,[id]);
        return result.rows[0];
    }

    async removerCategoria(id){
        const sql = "DELETE FROM categorias_acessibilidade WHERE id = $1 RETURNING id, nome;";
        const result = await db.query(sql,[id]);
        return result.rows[0];
    }

    async cadastrarNecessidade(necessidade){
        const {categoria_id,nome} = necessidade;
        const sql = ("INSERT INTO necessidades_acessibilidade (categoria_id, nome) VALUES($1, $2) RETURNING id, categoria_id, nome;");
        const result = await db.query(sql,[categoria_id, nome])
        return result.rows[0];
    }

    async listarNecessidades(){
        const sql = (`SELECT 
                        n.id, n.nome, n.categoria_id, c.nome AS categoria_nome 
                        FROM necessidades_acessibilidade n 
                        INNER JOIN categorias_acessibilidade c 
                        ON c.id = n.categoria_id 
                        ORDER BY c.nome, n.nome;`);
        const result =await db.query(sql);
        return result.rows;
    }

    async listarNecessidadesID(id){
        const sql = (`SELECT 
                        n.id, n.nome, n.categoria_id, c.nome AS categoria_nome 
                        FROM necessidades_acessibilidade n 
                        INNER JOIN categorias_acessibilidade c 
                        ON c.id = n.categoria_id 
                        WHERE n.id = $1;`);
        const result =await db.query(sql,[id]);
        return result.rows[0];
    }

    async atualizarNecessidade(id,necessidade){
        const {nome} = necessidade;
        const sql = "UPDATE necessidades_acessibilidade SET nome = $1 WHERE id = $2 RETURNING id, categoria_id, nome;";
        const result = await db.query(sql,[nome, id]);
        return result.rows[0];
    }

    async removerNecessidade(id){
        const sql = "DELETE FROM necessidades_acessibilidade WHERE id = $1 RETURNING id, categoria_id, nome;";
        const result = await db.query(sql,[id]);
        return result.rows[0];
    }


}export default new AcessibilidadeRepository();
