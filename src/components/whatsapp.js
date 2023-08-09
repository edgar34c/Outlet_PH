var nome = document.getElementById("nome")
var endereco = document.getElementById("endereco")
var tel = document.getElementById("telefone")
var cpf = document.getElementById("CPF")
var btn = document.getElementById("btn_enviar")
var telDest = "5511940547458"
var msg_bnt = "Olá, gostei dos produtos abaixo e gostaria de saber mais informações."


function whatsappSend(){
    fetch('/Outllet_PH/view/carrinhoTeste.php').then(response => {
        if(!response.ok){
            throw new Error('Erro na solicitação' + response.status)
        }
        return response.json()
    }).then(data => {
        const tam = Object.keys(data).length
        const vetor = [];
        var valorTotal = 0
        for (let i = 1; i <= tam; i++) {
            vetor.push(`${data[i].nome} Quantidade: ${data[i].quantidade}`);
            valorTotal = valorTotal + data[i].quantidade * data[i].preco
        }
        var valorTotal = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        const prod = vetor.join("%0a")
        var msg = `${msg_bnt}%0aMeus%20dados:%0aNome: ${nome.value}%0aCPF: ${cpf.value}%0aWhatsApp: ${tel.value}%0aEndereço: ${endereco.value}%0aProdutos:%0a${prod}%0aTotal: ${valorTotal}`
        var url = `https://api.whatsapp.com/send/?phone=${telDest}&text=${msg}&type=phone_number&app_absent=0`;
        window.open(url, '_blank').focus();
    }).catch(error => {
        console.error('Ocorreu um erro', error)
    })
}

btn.addEventListener('click', whatsappSend)