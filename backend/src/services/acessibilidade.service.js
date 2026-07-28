import AcessibilidadeRepository from "../repositories/acessibilidade.repository.js";

class AcessibilidadeService{
    async cadastrarCategoria(categoria){
        const {nome} = categoria;
        if(!nome|| nome.length <= 2 ){
            throw new Error("o nome da categoria deve ter mais que dois caracteres");
        }
        return await AcessibilidadeRepository.cadastrarCategoria(categoria)
    }

    async atualizarCategoria(id, categoria){
        const {nome} = categoria;
        if(!nome|| nome.length <= 2 ){
            throw new Error("o nome da categoria deve ter mais que dois caracteres");
        }
        return await AcessibilidadeRepository.atualizarCategoria(id, categoria)
    }

    async listarCategoria(){
        return await AcessibilidadeRepository.listarCategoria()
    }

    async listarCategoriaID(id){
        return await AcessibilidadeRepository.listarCategoriaID(id)
    }

    async removerCategoria(id){
        return await AcessibilidadeRepository.removerCategoria(id)
    }

    async cadastrarNecessidade(necessidade){
        const {categoria_id, nome} = necessidade;
        if(!nome|| nome.length <= 2 ){
            throw new Error("o nome da necessidade deve ter mais que dois caracteres");
        }

        const categoriaConsulta = await this.listarCategoriaID(categoria_id);

        if(!categoriaConsulta){
            throw new Error("Categoria não existe")
        }

        const cadastrado = await AcessibilidadeRepository.cadastrarNecessidade(necessidade);

        const result = {
            id: cadastrado.id,
            nome: cadastrado.nome,
            categoria_id: cadastrado.categoria_id,
            categoria_nome: categoriaConsulta.nome
        };
      return result
    }

    async listarNecessidades(){
        return await AcessibilidadeRepository.listarNecessidades();
    }

    async listarNecessidadesID(id){

        if (!id) {
            throw new Error("ID da necessidade é obrigatório");
        }

        const necessidade = await AcessibilidadeRepository.listarNecessidadesID(id);

        if (!necessidade) {
            throw new Error("Necessidade não encontrada");
        }

        return necessidade;
    }

    async atualizarNecessidade(id, necessidade){

        const {categoria_id, nome} = necessidade;

        if(!nome|| nome.length <= 2 ){
            throw new Error("o nome da necessidade deve ter mais que dois caracteres");
        }

        const categoriaConsulta = await this.listarCategoriaID(categoria_id);

        if(!categoriaConsulta){
            throw new Error("Categoria não existe")
        }

        const verificaNecessidade = await this.listarNecessidadesID(id);
        if(!verificaNecessidade){
            throw new Error("Necessidade não encontrada");
        }

        const atualizado = await AcessibilidadeRepository.atualizarNecessidade(id, necessidade)

        const result = {
            id: atualizado.id,
            nome: atualizado.nome,
            categoria_id: atualizado.categoria_id,
            categoria_nome: categoriaConsulta.nome
        };

        return result
    }

    async removerNecessidade(id){

        const verificaNecessidade = await this.listarNecessidadesID(id);
        if(!verificaNecessidade){
            throw new Error("Necessidade não encontrada");
        }

        const removido = await AcessibilidadeRepository.removerNecessidade(id);
    
        return removido;
    }

}export default new AcessibilidadeService();