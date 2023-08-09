import HeaderCadastro from "@/components/Cabecalho/HeaderCadastro";
import { useEffect, useState } from 'react';
import api from '../api/api';
import Head from 'next/head';

export default function cadastro() {
    const [nomeProd, setNomeProd] = useState('')
    const [preco, setPreco] = useState('')
    const [descricao, setDescricao] = useState('')
    const [arquivos, setArquivos] = useState(null)
    const [isLogado, setIsLogado] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLogado = window.localStorage.getItem('logado');
            setIsLogado(storedLogado === 'true');
            setIsPageLoaded(true);
        }
    }, []); // Executar somente no montagem do componente

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await api.cadastro(nomeProd, preco, descricao, arquivos);
            alert(response)
            window.location.assign("/cadastro")

        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao processar o cadastro.')
        }
    };

    const handleFileChange = (e: any) => {
        const files = Array.from(e.target.files);
        setArquivos(files);
    };

    if (isPageLoaded) {
        if (isLogado) {
            return (
                <div className="bg-white w-screen h-screen text-black">
                    <Head><title>Cadastro de produtos</title></Head>
                    <HeaderCadastro></HeaderCadastro>
                    <div className="grid place-items-center bg-zinc-100">
                        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12 border border-black rounded-md mt-5 mb-5">
                            <h1 className="text-center text-lg font-semibold text-black">Cadastro de novos produtos</h1>
                            <form className="mt-6" onSubmit={handleSubmit}>
                                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase" >Nome produto</label>
                                <input type="text" placeholder="Nike Air" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" onChange={(e) => setNomeProd(e.target.value)} value={nomeProd} required />
                                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Preço</label>
                                <input type="text" placeholder="R$150,00" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" onChange={(e) => setPreco(e.target.value)} value={preco} required />
                                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Descrição</label>
                                <textarea placeholder="Tenis nº 54" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" onChange={(e) => setDescricao(e.target.value)} value={descricao} required/>
                                <input type="file" name="file" multiple onChange={handleFileChange} className="block w-full p-3 mt-2" required/>
                                <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            )
        } else {
            // Redirecionamento de rota para a página de login
            if (typeof window !== 'undefined') {
                window.location.assign("/login");
            }
            return null
        }
    }
}
