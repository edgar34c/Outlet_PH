import HeaderDescricao from "@/components/Cabecalho/HeaderDescricao";
import IconeFlutuante from "@/components/IconeFlutuante";
import Head from "next/head";
import { useState } from 'react';

export default function whatsFroms() {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');

    
    const handleSubmit = (e: any) =>{
        e.preventDefault();
        let cart = JSON.parse(window.localStorage.getItem('cart'));
        const telDest = "5511940547458"
        const msg_bnt = "Olá, gostei dos produtos abaixo e gostaria de saber mais informações."
        let prodList = ""
        let totalPrice = 0
        let totalCart = 0
        if (!cart) {
            alert("O carrinho está vazio.")
        }else{
            for (const [productId, product] of Object.entries(cart)) {
                const { nome, preco, quantity } = product;
        
                // Certifique-se de que as informações necessárias estão presentes
                if (nome && preco !== undefined && quantity !== undefined) {
                    const totalProductPrice = preco * quantity;
                    prodList += `${nome} - Quantidade: ${quantity} - Preço: ${preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - Total: ${totalProductPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}%0a`;
                    totalPrice += totalProductPrice;
                    totalCart += totalPrice 
                } else {
                    console.error(`Dados incompletos para o produto com ID ${productId}.`);
                }
            }
            totalCart = totalCart/2
    
            var msg = `${msg_bnt}%0aMeus%20dados:%0aNome: ${nome}%0aCPF: ${cpf}%0aWhatsApp: ${telefone}%0aEndereço: ${endereco}%0aProdutos:%0a${prodList}Total: ${totalCart.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
            var url = `https://api.whatsapp.com/send/?phone=${telDest}&text=${msg}&type=phone_number&app_absent=0`;
            window.open(url, '_blank').focus();
        }

    }

    return (
        <div>
            <HeaderDescricao></HeaderDescricao>
            <Head><title>Outlet PH</title></Head>
            <div className="grid place-items-center bg-zinc-100">
                <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12 border border-black rounded-md mt-5 mb-5">
                    <h1 className="text-center text-lg font-semibold text-black">PREENCHA OS CAMPOS PARA FINALIZAR A COMPRA</h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase" >Nome completo</label>
                        <input type="text" name="email" placeholder="Digite seu nome" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Endereço</label>
                        <input type="text" name="email" placeholder="Rua dos indios Nº 999" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Telefone</label>
                        <input type="tel" name="email" placeholder="(11) 99999-9999" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">CPF</label>
                        <input type="text" name="email" placeholder="999.999.999-99" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                        <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
            <IconeFlutuante></IconeFlutuante>
        </div>
    )
}