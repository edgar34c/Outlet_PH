import cadastro from "@/pages/cadastro";

export default{
    login: async (usuario, senha) => {
        let login = {
            usuario, 
            senha
        };

        let requisicao = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(login)
        }

        const response = await fetch('http://192.168.1.8/backPH/login', requisicao);
        const data = await response.json()
        return data.msg
    },

    cadastro: async (nomeProd, preco, descricao, images) => {
        const formData = new FormData();
    
        formData.append('nomeProd', nomeProd);
        formData.append('preco', preco);
        formData.append('descricao', descricao);
    
        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }
    
        let requisicao = {
            method: 'POST',
            body: formData
        };
    
        const response = await fetch('http://192.168.1.8/backPH/cadastro', requisicao);
        const data = await response.json();
        return data.msg;
    },

    pegaProd: async () => {
        try {
            const response = await fetch('http://192.168.1.8/backPH/home');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    },

    descricao: async (id) => {
        const formData = new FormData();
        formData.append('id', id); // Passar o 'id' do produto com a chave 'id'
      
        let requisicao = {
          method: 'POST',
          body: formData
        };
      
        try {
          const response = await fetch('http://192.168.1.8/backPH/descricao', requisicao);
          const data = await response.json();
          return data; // Não é necessário retornar somente data.msg, pois precisamos dos detalhes do produto.
        } catch (error) {
          console.error('Erro na requisição:', error);
          throw error;
        }
      },

    atualizar: async (codproduto, nomeProd, preco, descricao) => {
        const formData = new FormData();
        formData.append('codproduto', codproduto);
        formData.append('nomeProd', nomeProd);
        formData.append('preco', preco);
        formData.append('descricao', descricao);
    
        let requisicao = {
            method: 'POST',
            body: formData
        };
    
        try {
            const response = await fetch('http://192.168.1.8/backPH/atualizar', requisicao);
            const data = await response.json();
            if (data.status === 'success') {
                return data.msg;
            } else {
                throw new Error(data.msg);
            }
        } catch (error) {
            console.error('Erro na requisição de atualização:', error);
            throw new Error('Ocorreu um erro ao processar a atualização.');
        }
    },
    

    excluir: async(id) => {
        let prod = {
            id
        };


        let requisicao = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(prod)
        }

        const response = await fetch('http://192.168.1.8/backPH/excluir', requisicao);
        const data = await response.json()
        return data.msg
    },

    prodById: async (id) => {
        const formData = new FormData();
        formData.append('codproduto', id);
    
        let requisicao = {
            method: 'POST',
            body: formData
        }
    
        try {
            const response = await fetch('http://192.168.1.8/backPH/retornar', requisicao);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    },

    
}