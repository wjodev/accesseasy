class ViaCepUtil {

    async buscarCEP(cep) {

        const cepLimpo = cep.replace(/\D/g, "");

        if (cepLimpo.length !== 8) {
            throw new Error("CEP inválido.");
        }

        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

        if (!response.ok) {
            throw new Error("Erro ao consultar o ViaCEP.");
        }

        const localizacao = await response.json();

        if (localizacao.erro) {
            throw new Error("CEP não encontrado.");
        }

        return localizacao;
    }

}

export default new ViaCepUtil();