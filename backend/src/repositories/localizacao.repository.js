import db from "../config/db.js";

class LocalizacaoRepository{

    async cadastrar(localizacao){
      const  { cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude} = localizacao;
      const sql = `INSERT INTO localizacao (cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                RETURNING id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude;`;
      const result = await db.query(sql, [cep,
        estado,
        cidade,
        bairro,
        rua,
        numero, 
        complemento,
        latitude,
        longitude]);
        
        return result.rows[0];
    }

    async listar(){
      const sql = `SELECT id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude
                  FROM localizacao ORDER BY id`;
      const result = await db.query(sql);
      return result.rows;
    }

    async listarId(id){

        const sql = `SELECT id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude
                    FROM localizacao WHERE id = $1`;
        const result = await db.query(sql, [id]);
        return result.rows[0];

    }

    async atualizar(id,localizacao){

      const  { cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude} = localizacao
      const sql = `UPDATE localizacao SET 
                cep = $1,
                estado = $2,
                cidade = $3,
                bairro = $4,
                rua = $5,
                numero = $6,
                complemento = $7,
                latitude = $8,
                longitude = $9

                WHERE id = $10
                 
                RETURNING id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude;`;

      const result = await db.query(sql, [cep,
        estado,
        cidade,
        bairro,
        rua,
        numero, 
        complemento,
        latitude,
        longitude, 
        id]);
        
        return result.rows[0];

    }

    async remover(id){
      const sql = `DELETE FROM localizacao WHERE id = $1
         RETURNING id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude;`;
      const result = await db.query(sql, [id]);
      return result.rows[0];
        
    }


}export default new LocalizacaoRepository();