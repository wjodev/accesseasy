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

    async cadastrarSuporte(suporte){
        const {categoria_id, nome} = suporte;
        if(!nome|| nome.length <= 2 ){
            throw new Error("o nome do suporte deve ter mais que dois caracteres");
        }

        const categoriaConsulta = await this.listarCategoriaID(categoria_id);

        if(!categoriaConsulta){
            throw new Error("Categoria não existe")
        }

        const cadastrado = await AcessibilidadeRepository.cadastrarSuporte(suporte);

        const result = {
            id: cadastrado.id,
            nome: cadastrado.nome,
            categoria_id: cadastrado.categoria_id,
            categoria_nome: categoriaConsulta.nome
        };
      return result
    }

    async listarSuporte(){
        return await AcessibilidadeRepository.listarSuporte();
    }

    async listarSuporteID(id){

        if (!id) {
            throw new Error("ID do suporte é obrigatório");
        }

        const suporte = await AcessibilidadeRepository.listarSuporteID(id);

        if (!suporte) {
            throw new Error("Suporte não encontrado");
        }

        return suporte;
    }

    async atualizarSuporte(id, suporte){

        const {categoria_id, nome} = suporte;

        if(!nome|| nome.length <= 2 ){
            throw new Error("o nome do suporte deve ter mais que dois caracteres");
        }

        const categoriaConsulta = await this.listarCategoriaID(categoria_id);

        if(!categoriaConsulta){
            throw new Error("Categoria não existe")
        }

        const verificaSuporte = await this.listarSuporteID(id);
        if(!verificaSuporte){
            throw new Error("Suporte não encontrado");
        }

        const atualizado = await AcessibilidadeRepository.atualizarSuporte(id, suporte)

        const result = {
            id: atualizado.id,
            nome: atualizado.nome,
            categoria_id: atualizado.categoria_id,
            categoria_nome: categoriaConsulta.nome
        };

        return result
    }

    async removerSuporte(id){

        const verificaSuporte = await this.listarSuporteID(id);
        if(!verificaSuporte){
            throw new Error("Suporte não encontrado");
        }

        const removido = await AcessibilidadeRepository.removerSuporte(id);
    
        return removido;
    }

}export default new AcessibilidadeService();