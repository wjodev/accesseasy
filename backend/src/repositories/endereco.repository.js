import db from "../config/db.js";

class EnderecoRepository{

    async cadastrar(endereco){
      const  { cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude} = endereco
      const sql = (`INSERT INTO enderecos (cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                RETURNING id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude;`)
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
      const sql = (`SELECT id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude
                  FROM enderecos ORDER BY id`);
      const result = await db.query(sql);
      return result.rows;
    }

    async listarId(id){

        const sql = (`SELECT id,cep, estado, cidade, bairro, rua, numero, complemento, latitude, longitude
                    FROM enderecos WHERE id = $1`);
        const result = await db.query(sql, [id]);
        return result.rows[0];

    }

    async atualizar(id,endereco){

    }

    async remover(id){
        
    }


}export default new EnderecoRepository();

